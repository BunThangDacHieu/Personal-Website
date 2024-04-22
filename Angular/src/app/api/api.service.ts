import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/Category';
import { Posts } from '../model/Post';

@Injectable({
  providedIn: 'root'  
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8080'; 
  private categoryUrl: string = `${this.baseUrl}/Category`;
  private postUrl: string = `${this.baseUrl}/post`;
    constructor(private http: HttpClient) {}

  // Các phương thức liên quan đến Category
  See_All_Category(): Observable<any> {
    return this.http.get<any>(this.categoryUrl);
  }

  Add_A_New_Category(category: Category): Observable<any> {
    return this.http.post<any>(this.categoryUrl, category);
  }

  Update_Category_Information(category: Category): Observable<Category> {
    const updatedCategory = {
      name: category.Name, 
    };
  
    return this.http.put<Category>(`${this.categoryUrl}/${category.Category_id}`, updatedCategory);
  }

  Delete_Category_by_Id(Category_id: string): Observable<Category[]> {
    return this.http.delete<Category[]>(`${this.categoryUrl}/${Category_id}`);
  }

  // Các phương thức liên quan đến Post
  SeeAllPost():Observable<Posts[]>{
    return this.http.get<Posts[]>(this.postUrl);
  }

  FindPostbyTitle(title: string): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.postUrl}/${title}`);
  }

  DeletePost(Post_id: string): Observable<Posts[]> {
    return this.http.delete<Posts[]>(`${this.postUrl}/${Post_id}`);
  }

  UpdatePostInformation(post: Posts): Observable<Posts> {
    return this.http.put<Posts>(`${this.postUrl}/${post.title}`, post);
  }

  CreateNewPost(post: Posts): Observable<Posts> {
    return this.http.post<Posts>(this.postUrl, post);
  }
}