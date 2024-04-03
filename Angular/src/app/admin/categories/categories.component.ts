import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private api:ApiService){}
  formCategory:any;
  ngOnInit(): void {
    this.formCategory = new FormGroup({
      category: new FormControl(null,[Validators.required]),
    })
  }
  onSubmit(){
    const formData = this.formCategory.value;
    const NewCategory: Category = {Name: formData.category};
    this.api.Add_A_New_Category(NewCategory).subscribe(
      response =>{
        console.log('Category add successfully', response);
        this.formCategory.reset();
      },
      error =>{
        console.error('Error adding category:', error.error); // Log the specific error message from the server
      }
    )
    console.log(formData)
  }
}
