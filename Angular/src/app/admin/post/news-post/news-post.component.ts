import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.css'] // Sửa styleUrl thành styleUrls
})
export class NewsPostComponent implements OnInit {
  permalink: string = '';
  title: string = '';
  imgSrc: string ='./assets/istockphoto-1147544807-612x612.jpg';
  selectedImg: File | null = null; // Khai báo thuộc tính selectedImg

  constructor(){}

  ngOnInit(): void {}

  onTitleChange($event: any) {
    this.title = $event.target.value;
    this.generatePermalink();
  }

  generatePermalink() {
    this.permalink = this.title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result as string;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
}
