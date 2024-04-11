import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Thay đổi url tới máy chủ của bạn

  constructor(private http: HttpClient,
    private toastr: ToastrService
  ) { }


  register(UserMail: string, UserPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, { UserMail, UserPassword }).pipe(
      catchError(error => {
        if (error && error.error && error.error.message === 'This Account is Already Exists') {
          this.toastr.error('This Account is Already Exists');
        } else {
          // Xử lý các lỗi khác 
          this.toastr.error('An error occurred during signup.');
          console.log(error);
          
        }
        throw error; // Chuyển tiếp lỗi để xử lý ở nơi sử dụng
      })
    );
  }
  
  login(UserMail: string, UserPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { UserMail, UserPassword }).pipe(
      catchError(error => {
        // Xử lý lỗi đăng nhập ở đây nếu cần
        throw error;
      })
    );
  }

  isAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/isAdmin`).pipe(
      catchError(error => {
        // Xử lý lỗi ở đây nếu cần
        throw error;
      })
    );
  }
}