import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/Category';
import { ApiService } from '../../../api/api.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Posts } from '../../../model/Post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent implements OnInit {
  formPost!: FormGroup;
  categories:any = [];
  permalink: string = '';
  title: string = '';
  imgSrc: string = './assets/istockphoto-1147544807-612x612.jpg';
  selectedImg: File | null = null;

  constructor(private api: ApiService, 
              private toastr: ToastrService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.SeeAllCategory();
    this.formPost = this.formBuilder.group({
      title: ['', Validators.required], // Validators để kiểm tra tính hợp lệ
      permalink: [{value: '', disabled: true}], // Giá trị mặc định và disabled
      excerpt: [''],
      category: ['', Validators.required], // Validators để yêu cầu lựa chọn
      image: [false],
      content: ['']
  });
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
  onSubmit() {
    if (this.formPost.valid) {
      const newPost: Posts = this.formPost.value;

      this.api.CreateNewPost(newPost).subscribe(
        () => {
          this.toastr.success('Post saved successfully');
          this.formPost.reset();
        },
        (error) => {
          console.error('Error saving post:', error);
          this.toastr.error('Failed to save post. Please try again later.');
        }
      );
    } else {
      this.toastr.error('Please fill out all required fields.');
    }
  }
  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  }
}
