import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-narbar',
  templateUrl: './category-narbar.component.html',
  styleUrl: './category-narbar.component.css'
})
export class CategoryNarbarComponent {
  categories: any = [];
  constructor(private api:ApiService,
    private toastr: ToastrService){}
    ngOnInit(): void {
      this.SeeAllCategory();
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
