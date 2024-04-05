import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup; // Khởi tạo biến formLogin với kiểu FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  } 

  get email() {
    // Kiểm tra xem formLogin có null không trước khi truy cập email
    return this.formLogin ? this.formLogin.get('email') : null;
  }

  get password() {
    // Kiểm tra xem formLogin có null không trước khi truy cập password
    return this.formLogin ? this.formLogin.get('password') : null;
  }

  onSubmit() {
    if (this.formLogin && this.formLogin.valid) {
      // Handle form submission
      console.log(this.formLogin.value);
      this.router.navigateByUrl('/dashboard');
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
