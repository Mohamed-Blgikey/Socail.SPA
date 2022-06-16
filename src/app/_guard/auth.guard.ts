import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from '../_Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private auth:AuthService,private router:Router,private alert:HotToastService) {  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const roles = route.firstChild?.data['roles'] as Array<string>;
      // console.log(roles);
      if (roles) {
        const match = this.auth.roleMatch(roles);
        if (match) {
          return true;
        }else{
          this.alert.error("غير مسموح لك بالدخول");
          this.router.navigate(["/members"])
          return false;
        }
      }
      if (this.auth.loggedIn()) {
      return true;
    }

    this.alert.error("يجب تسجيل الدخول اولا");
    this.router.navigate(["/"])
    return false;
  }

}
