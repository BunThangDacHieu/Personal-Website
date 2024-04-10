  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../../helper/auth.service';
    import { ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'] 
  })
  export class SignupComponent implements OnInit {
    FormSignup!: FormGroup; 

    constructor(
      private formBuilder: FormBuilder, 
      private router: Router,
      private authService: AuthService,
      private toastr: ToastrService
    ) { }

    ngOnInit(): void {
      this.FormSignup = this.formBuilder.group({
        UserMail: ['', [Validators.required, Validators.email]],
        UserPassword: ['', Validators.required]
      });
    } 

    get UserMail() {
      return this.FormSignup ? this.FormSignup.get('UserMail') : null;
    }

    get UserPassword() {
      return this.FormSignup ? this.FormSignup.get('UserPassword') : null;
    }

    onSubmit() {
      if (this.FormSignup && this.FormSignup.valid) {
        const { UserMail, UserPassword } = this.FormSignup.value;
        this.authService.register(UserMail, UserPassword).subscribe(
          () => {
            // Đăng ký thành công, điều hướng đến trang dashboard
            this.router.navigateByUrl('/dashboard');
          },
          (error) => {
            // Xử lý lỗi đăng ký
            console.error('Signup failed:', error);
            if (error && error.error && error.error.message === 'This Account is Already Exists') {
              this.toastr.error('This Account is Already Exists');
            } else {
              this.toastr.error('An error occurred during signup.');
            }
          }
        );
      } else {
        // Form không hợp lệ, xử lý theo cách phù hợp
      }
    }
    
  }
