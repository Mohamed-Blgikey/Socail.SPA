import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../_Services/auth.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit{
 @Input() hasRole :string [] = [];
 isVisible = false;
  constructor(private vcr:ViewContainerRef,private tepReg:TemplateRef<any>,private auth:AuthService)  { }


  ngOnInit(): void {
    const userRoles = this.auth.user['_value'].roles as Array<string>
    if (!userRoles) {
      this.vcr.clear();
    }

    if (this.auth.roleMatch(this.hasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.vcr.createEmbeddedView(this.tepReg)
      }else{
        this.isVisible = false;
        this.vcr.clear();
      }
    }
  }

}
