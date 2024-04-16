import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private baseUrl: string = 'http://localhost:8080'; 
  private uploadUrl: string = `${this.baseUrl}/upload`;

  constructor(private http: HttpClient) { }
  uploadImage(imageData: any): Observable<any>{
    return this.http.post<any>(this.uploadUrl, imageData);
  }
  
}
