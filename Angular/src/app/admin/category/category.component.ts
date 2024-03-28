import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  constructor(private api: ApiService){}
  ngOnInit(): void {}
  
}
