import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { Category } from '../../model/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories: any = [];
  constructor(private api:ApiService,
              private toastr: ToastrService){}
  formCategory:any;
  isSubmit= false;
  ngOnInit(): void {
    this.formCategory = new FormGroup({
      category: new FormControl(null,[Validators.required]),
    });
    this.SeeAllCategory();
  }
  onSubmit(){
    this.isSubmit = true;
    const hasErrorForm = this.formCategory.valid;
    if(!hasErrorForm) return; //Chỗ này check nếu form validate thiếu giá trị thì ko thực hiện submit
    const formData = this.formCategory.value;
    const NewCategory: Category = {
      Name: formData.category,
      Category_id: ''
    };
    this.api.Add_A_New_Category(NewCategory).subscribe(
      response =>{
        console.log('Category Add Successfully', response);
        this.formCategory.reset();
        this.toastr.success('Add Category Successfully')
        this.SeeAllCategory();
      },
      error =>{
        console.error('Error adding category:', error.error); // Log the specific error message from the server
        this.toastr.error('Please Check Your Input');
      }
    )
    console.log(formData)
  }
  
  SeeAllCategory() {
    this.api.See_All_Category().subscribe(
      categories => {
        this.categories = categories.data;
        console.table(this.categories); // Kiểm tra dữ liệu sau khi gán cho thuộc tính categories
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }
  OnEdit(category: Category){
    const updatedCategory = { ...category }; // Tạo một bản sao của đối tượng danh mục
    // Thực hiện các thay đổi cần thiết trên đối tượng danh mục, ví dụ như tên danh mục mới
    updatedCategory.Name = "New Category Name"; // Thay đổi tên danh mục thành tên mới
    
    this.api.Update_Category_Information(updatedCategory).subscribe(
      response => {
        console.log('Category Updated Successfully', response);
        this.toastr.success('Category Updated Successfully');
        this.SeeAllCategory(); // Load lại danh sách sau khi cập nhật
      },
      error => {
        console.error('Error updating category:', error);
        this.toastr.error('Something went wrong, please try again');
      }
    );
  }
  
  

  OnDelete(categories: Category) { 
    const categoryId = categories.Category_id;
    this.api.Delete_Category_by_Id(categoryId).subscribe(
      () => {
        console.log('Category Deleted Successfully');
        this.toastr.success('Category Deleted Successfully');
        this.SeeAllCategory(); // Load lại danh sách sau khi xóa
      },
      error => {
        console.error('Error Deleting', error);
        this.toastr.error('Something is wrong, please check again');
      }
    );
}

   hasValidator(control: string, validator: string): boolean {
    return !!this.formCategory.valid[control].validators(control).hasOwnProperty(validator);
   // returns true if control has the validator
  }
}
