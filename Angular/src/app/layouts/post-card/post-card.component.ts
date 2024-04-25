import { Component, Input } from '@angular/core';
import { ApiService } from '../../api/api.service';


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post: any;
  Post:any = [];
  constructor(private api: ApiService,

  ){}
  limitText(text: string, wordLimit: number): string {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  ngOnInit(): void{}
  SeeAllPost() {
    this.api.SeeAllPost().subscribe(
      post => {
        this.Post = post; // Assuming post is an array of post objects
      },
      error => {
        console.error('Error loading post:', error);
      }
    );
  }
}
