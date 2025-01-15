import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginRequest } from '../features/models/login-request-model';
import { environment } from 'src/environments/environment.development';
import { LoginResponse } from '../features/models/login-response-model';
import { User } from '../features/models/user-model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  $user = new BehaviorSubject<User | undefined>(undefined);

  login(data: loginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/api/Register/Login`, data)
  }
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
    this.router.navigateByUrl('/')
  }

  setUser(user: User) {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email),
      localStorage.setItem('user-role', user.roles.join(","))
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getuserFromLocalStorage(): User | undefined {
    let email = localStorage.getItem('user-email');
    let role = localStorage.getItem("user-role")
    if (email && role) {
      let user: User = {
        email: email,
        roles: role.split(',')
      }
      return user
    }
    return undefined
  }

}
