import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private apiService: Auth, private router: Router) {
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  } 

  onSubmit() {
     this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          const token = res?.token;
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res.user));
            this.router.navigate(["/dashboard"]);
          }
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
