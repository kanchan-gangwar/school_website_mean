import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(["/"]);
  }

  login(email: string, password: string) {
    let body = {email, password};
    return this.http.post(environment.apiUrl + "/auth/login", body)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
