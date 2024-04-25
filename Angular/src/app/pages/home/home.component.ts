import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Post:any[] = [];
  latestPost: any;
  constructor(private api: ApiService,
  ){}

  ngOnInit(): void{
    this.SeeAllPost();
  }
  SeeAllPost() {
    this.api.SeeAllPost().subscribe(
      post => {
        this.Post = post; // Assuming post is an array of post objects
        console.table(this.Post);
        this.setLatestPost();
      },
      error => {
        console.error('Error loading post:', error);
      }
    );
  }
  
  setLatestPost() {
    // Sorting logic assuming 'createdAt' or 'updatedAt' is a valid Date object
    this.latestPost = this.Post.sort((a, b) => {
      const dateA = a.createdAt || a.updatedAt;
      const dateB = b.createdAt || b.updatedAt;

      if (dateA instanceof Date && dateB instanceof Date) {
        return dateA.getTime() - dateB.getTime(); // Change to:
      } else {
        // Handle cases where timestamps are missing or invalid
        return 0;
      }
    })[0];
  }

}
