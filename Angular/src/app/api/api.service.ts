import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = 'http://localhost:8080/post'
  constructor(private http:HttpClient){}

  //get all Usser data
  SeeAllPost():Observable<Posts[]>{
    return this.http.get<Posts[]>(this.url);
  }

  FindPostbyid(Blog_id:string):Observable<Posts[]>{
    return this.http.get<Posts[]>(this.url + '/'+ Blog_id);
  }
  DeletePostbyId(Blog_id:string):Observable<Posts[]>{
    return this.http.delete<Posts[]>(this.url + '/'+ Blog_id);
  }
  UpdatePostInformation(post: Posts):Observable<Posts>{
    return this.http.put<Posts>(this.url + '/' + post.Blog_id, post)
  }
  CreateNewPost(post: Posts):Observable<Posts>{
    return this.http.post<Posts>(this.url, post)
  }
}