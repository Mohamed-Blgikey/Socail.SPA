import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _lang = 'ar';
  dir = 'rtl'

  jwtHelper = new JwtHelperService();

  user = new BehaviorSubject(null);
  laguage = new BehaviorSubject<string>('ar');
  lang = this.laguage.asObservable();

  constructor(private http :HttpClient) {
    if (localStorage.getItem('token') != null) {
      this.saveUser();
    }
    this.lang.subscribe(res=>{
      // console.log(res);
      if (res == 'en') {
        this._lang = 'en'
        this.dir = 'ltr'
      }else{
        this._lang = 'ar';
        this.dir = 'rtl'
      }
    })
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

  roleMatch(allRoles:string[]):boolean{
    let isMatch = false;
    const userRoles = this.user['_value'].roles as Array<string>;
    allRoles.forEach(e=>{
       if (userRoles.includes(e)) {
        isMatch =true;
        return ;
       }
    });
    return isMatch;
  }
}
