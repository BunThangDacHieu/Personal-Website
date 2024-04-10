import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../helper/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

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

      // Assuming you have an API endpoint for user authentication
      this.authService.login(UserMail, UserPassword).subscribe(
        (response) => {
          // Check if the response indicates successful authentication
          if (response.success) {
            // Redirect to the dashboard
            this.router.navigateByUrl('/dashboard');
          } else {
            // Handle authentication failure (e.g., invalid credentials)
            this.toastr.error('Invalid username or password.');
          }
        },
        (error) => {
          // Handle other errors (e.g., network issues)
          console.error('Login failed:', error);
          this.toastr.error('An error occurred during login.');
        }
      );
    } else {
      // Handle form validation errors
      this.toastr.warning('Please fill in valid email and password.');
    }
  }
}
