import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(){}
  formCategory:any;
  ngOnInit(): void {
    this.formCategory = new FormGroup({
      name: new FormControl(null,[Validators.required]),

    })
  }
  onSubmit(){
    const formData = this.formCategory.value;
    console.log(formData)
  }
}
