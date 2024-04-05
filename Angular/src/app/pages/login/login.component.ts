import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../helper/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  formLogin?: FormGroup; 

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      UserMail: ['', [Validators.required, Validators.email]],
      UserPassword: ['', Validators.required]
    });
  } 

  get UserMail() {
    return this.formLogin ? this.formLogin.get('UserMail') : null;
  }

  get UserPassword() {
    return this.formLogin ? this.formLogin.get('UserPassword') : null;
  }

  onSubmit() {
    if (this.formLogin && this.formLogin.valid) {
      const { UserMail, UserPassword } = this.formLogin.value;
      this.authService.login(UserMail, UserPassword).subscribe(
        () => {
          // Đăng nhập thành công, điều hướng đến trang dashboard
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          // Xử lý lỗi đăng nhập
          console.error('Login failed:', error);
          // Hiển thị thông báo lỗi cho người dùng hoặc thực hiện các hành động khác
        }
      );
    } else {
      // Form không hợp lệ, xử lý theo cách phù hợp
    }
  }
}
