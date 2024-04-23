import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Posts } from '../../../model/Post';


@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {
  base64: any;
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
  OnDelete(Post: Posts) { 
    console.log(Post,'acd')
    const PostId = Post.Post_id;
    this.api.DeletePost(PostId).subscribe(
      () => {
        console.log('Category Deleted Successfully');
        this.toastr.success('Category Deleted Successfully');
        this.SeeAllPost(); // Load lại danh sách sau khi xóa
      },
      error => {
        console.error('Error Deleting', error);
        this.toastr.error('Something is wrong, please check again');
      }
    );
}
}
