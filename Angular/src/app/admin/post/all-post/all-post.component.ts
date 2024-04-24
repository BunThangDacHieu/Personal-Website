import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Posts } from '../../../model/Post';
import {MatDialog} from '@angular/material/dialog';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {
  base64: any;
  Post:any = [];
  constructor(private api: ApiService,
    private toastr: ToastrService,
    private _dialog: MatDialog
  ){}

  ngOnInit(): void{
    this.SeeAllPost();
  }
  limitText(text: string, wordLimit: number): string {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
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
  OnDelete(Post: any) { 
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
  OpenAddEditPost(){
    this._dialog.open(PostEditComponent)
  }
}
