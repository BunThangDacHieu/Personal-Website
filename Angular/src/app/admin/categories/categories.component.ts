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
    const NewCategory: Category = {Name: formData.category};
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
        if (Array.isArray(categories)) { // Kiểm tra nếu categories là một mảng
          this.SeeAllCategory = this.categories.data((categories: any, index: number) => {
            return { ...categories, Number: index + 1 };
          });
        } else {
          console.error('Returned data is not an array:', categories);
          this.toastr.error('Failed to load categories');
        }
      },
      error => {
        console.error('Error loading categories:', error);
        this.toastr.error('Failed to load categories');
      }
    );
  }
  

  OnEdit(formCategory: any){ 
    console.log(formCategory);
  }

   hasValidator(control: string, validator: string): boolean {
    return !!this.formCategory.valid[control].validators(control).hasOwnProperty(validator);
   // returns true if control has the validator
  }
}
