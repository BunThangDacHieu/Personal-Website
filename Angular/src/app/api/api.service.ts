import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../model/Users';
import { Category } from '../model/Category';
import { Posts } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  CategoryUrl:string = 'http://localhost:8080/Category';
  PostURL: string = 'http://localhost:8080/post';
  constructor(private http:HttpClient){}

  //get all Usser data
  See_All_Category():Observable<Category[]>{
    return this.http.get<Category[]>(this.CategoryUrl);
  }
  Add_A_New_Category(category: Category):Observable<Category[]>{
    return this.http.post<Category>(`${this.categoryUrl}/${name}`);
  }
  FindUserbyid(Blog_id:string):Observable<Users[]>{
    return this.http.get<Users[]>(this.url + '/'+ Blog_id);
  }
  DeleteUserbyId(Blog_id:string):Observable<Users[]>{
    return this.http.delete<Users[]>(this.url + '/'+ Blog_id);
  }
  UpdateUserInformation(users: Users):Observable<Users>{
    return this.http.put<Users>(this.url + '/' + users.Blog_id, users)
  }
  CreateNewUser(users: Users):Observable<Users>{
    return this.http.post<Users>(this.url, users)
  }
}