import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Post:any = [];
  constructor(private api: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(): void{
    this.SeeAllPost();
  }
  SeeAllPost() {
    this.api.SeeAllPost().subscribe(
      post => {
        this.Post = post; // Assuming post is an array of post objects
        console.table(this.Post);
      },
      error => {
        console.error('Error loading post:', error);
      }
    );
  }

}
