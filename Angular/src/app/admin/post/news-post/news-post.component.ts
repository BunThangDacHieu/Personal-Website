import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/Category';
import { ApiService } from '../../../api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent implements OnInit {
  categories:any = [];
  permalink: string = '';
  title: string = '';
  imgSrc: string = './assets/istockphoto-1147544807-612x612.jpg';
  selectedImg: File | null = null;

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.SeeAllCategory();
  }

  onTitleChange($event: any) {
    this.title = $event.target.value;
    this.generatePermalink();
  }

  generatePermalink() {
    this.permalink = this.title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview($event: any) {
    if ($event && $event.target && $event.target.files && $event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target?.result as string;
      }
      reader.readAsDataURL($event.target.files[0]);
      this.selectedImg = $event.target.files[0];
    }
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
  
}
