import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Thay đổi url tới máy chủ của bạn

  constructor(private http: HttpClient) { }

  login(UserMail: string, UserPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, { UserMail, UserPassword });
  }
}
