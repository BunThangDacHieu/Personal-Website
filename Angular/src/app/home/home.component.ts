import { Component } from '@angular/core';
import { Posts } from '../model/Post';
import { ApiService } from '../api/api.service';
import { Role } from '../model/Role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  post: Posts = {
    Role: Role.User,  
    UserName: '',
    Blog_id: 0,
    title: '',
    Content: ''
  };

  title: string = '';
  Content:string = '';
  UserName:string = '';

  AllPosts: Posts[] = [
  ]

  constructor(private api: ApiService) {
    console.log(this.post.Role); // Kiểm tra xem Role đã được gán đúng chưa
  }

  ngOnInit(): void {
    // Implement ngOnInit if needed
    this.title = '';
    this.Content = '';
    this.UserName = '';

    this.SeeAllPost();
  }


  SeeAllPost() {
    console.log("SeeAllPost")
    this.api.SeeAllPost().subscribe(
      (data: any) => {
        this.AllPosts = data.data
        console.log("this.AllPosts : ", data)
      },
      err => {
        console.log(err);
      }
    );
  }

  FindPostbyid(post: Posts) {
    console.log("FindPostbyid");
    const postId = post.Blog_id.toString(); // Chuyển Blog_id thành chuỗi
    this.api.FindPostbyid(postId).subscribe(
      (data: any) => {
        this.AllPosts = [data];
        console.log("this.AllPosts : ", data)
      },
      err => {
        console.log(err);
      }
    );
  }
  

  DeletePostbyId(post: Posts) {
    if (window.confirm('Are you sure you want to delete this post ' + post.Blog_id + '?')) {
      const blogIdAsString = post.Blog_id.toString(); // Chuyển đổi Blog_id thành chuỗi
      this.api.DeletePostbyId(blogIdAsString).subscribe(
        () => {
          this.AllPosts = [];
          this.SeeAllPost();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  

  CreateNewPost() {
    if (!this.title || !this.Content || !this.UserName) {
      alert('Please fill in all fields.');
      return;
    }
  
    const newPost: Posts = {
      Role: Role.User, // Đặt giá trị Role ở đây hoặc thay thế bằng giá trị từ nguồn dữ liệu phù hợp
      UserName: this.UserName,
      Blog_id: Math.floor(Math.random() * 1000), // Bạn có thể cần tạo một ID ngẫu nhiên ở đây
      title: this.title,
      Content: this.Content
    };
  
    this.api.CreateNewPost(newPost).subscribe(
      res => {
        this.AllPosts = [];
        this.SeeAllPost();
      },
      err => {
        console.log(err);
      }
    );
  }
  

  editPost(post: Posts){
    this.FindPostbyid(post);
    this.title = post.title;
    this.Content = post.Content;
    this.UserName = post.UserName;
  }

  UpdatePostInformation() {
    if (!this.title || !this.Content || !this.UserName) {
      alert('Please fill in all fields.');
      return;
    }

    this.post.title = this.title;
    this.post.Content = this.Content;
    this.post.UserName = this.UserName;

    this.api.UpdatePostInformation(this.post).subscribe(
      res => {
        this.SeeAllPost();
      },
      err => {
        console.log(err);
      }
    );
  }
}
