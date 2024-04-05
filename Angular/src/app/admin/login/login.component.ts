import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | null = null;
 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.formLogin ? this.formLogin.get('email') : null;
  }

  get password() {
    return this.formLogin? this.formLogin.get('password'): null;
  }

  onSubmit() {
    if ( this.formLogin && this.formLogin.valid) {
      // Handle form submission
      console.log(this.formLogin.value);
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
