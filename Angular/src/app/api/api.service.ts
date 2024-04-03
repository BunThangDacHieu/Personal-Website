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
  See_All_Category(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  Add_A_New_Category(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(this.categoryUrl, category);
  }

  Update_Category_Information(category: Category): Observable<Category[]> {
    return this.http.put<Category[]>(`${this.categoryUrl}/${category.Name}`, category);
  }

  Delete_Category_by_Name(Name: string): Observable<Category[]> {
    return this.http.delete<Category[]>(`${this.categoryUrl}/${Name}`);
  }

  // Các phương thức liên quan đến Post
  SeeAllPost():Observable<Posts[]>{
    return this.http.get<Posts[]>(this.postUrl);
  }

  FindPostbyTitle(title: string): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.postUrl}/${title}`);
  }

  DeletePost(title: string): Observable<Posts[]> {
    return this.http.delete<Posts[]>(`${this.postUrl}/${title}`);
  }

  UpdatePostInformation(post: Posts): Observable<Posts> {
    return this.http.put<Posts>(`${this.postUrl}/${post.Title}`, post);
  }

  CreateNewPost(post: Posts): Observable<Posts> {
    return this.http.post<Posts>(this.postUrl, post);
  }
}