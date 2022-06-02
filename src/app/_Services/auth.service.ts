import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  login(obj:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}Login`,obj);
  }

  register(obj:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}Register`,obj);
  }
}
