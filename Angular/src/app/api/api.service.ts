import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = 'http://localhost:8080/users'
  constructor(private http:HttpClient){}

  //get all Usser data
  SeeAllUser():Observable<Users[]>{
    return this.http.get<Users[]>(this.url);
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