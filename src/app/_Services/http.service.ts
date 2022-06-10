import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  Get(EndPoint: string): Observable<any> {

    let token = localStorage.getItem('token');
    let header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.get(this.FullPath(EndPoint), header);
  }

  Post(EndPoint: string,obj:any): Observable<any> {

    let token = localStorage.getItem('token');
    let header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.post(this.FullPath(EndPoint),obj, header);
  }
  Put(EndPoint: string,obj:any = null): Observable<any> {

    let token = localStorage.getItem('token');
    let header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.put(this.FullPath(EndPoint),obj, header);
  }



  private FullPath(EndPoint: string): string {
    return environment.baseUrl + EndPoint;
  }
}
