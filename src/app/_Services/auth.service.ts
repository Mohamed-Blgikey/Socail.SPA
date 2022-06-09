import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  user = new BehaviorSubject(null);
  constructor(private http :HttpClient) {
    if (localStorage.getItem('token') != null) {
      this.saveUser();
    }
   }

  login(obj:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}Login`,obj);
  }

  register(obj:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}Register`,obj);
  }

  saveUser(){
    const token:any = localStorage.getItem('token');
    this.user.next(this.jwtHelper.decodeToken(token));
    // console.log(this.user);

  }

  loggedIn(){
    try {
      const token:any = localStorage.getItem('token');
      return ! this.jwtHelper.isTokenExpired(token)
    } catch (error) {
      return false;
    }
  }
}
