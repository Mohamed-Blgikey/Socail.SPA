import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserApi } from "../_APi/User";
import { User } from "../_Models/user";
import { HttpService } from "../_Services/http.service";

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private http:HttpService,private router:Router){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
      return this.http.Get(`${UserApi.GetUser}${route.params['id']}`).pipe(
        catchError((error) => {
          this.router.navigate(['/members']);
          return of();

      })
      )
    }

}
