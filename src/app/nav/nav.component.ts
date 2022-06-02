import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName:string = '';
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })
  constructor(private auth:AuthService,private alert:HotToastService,private router:Router) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res=>{
      this.userName = this.auth?.user['_value']?.fullName
    })
  }


  login(form:FormGroup){
    // console.log(form.value);
    this.auth.login(form.value).subscribe(
    res=>{
      if (res.message == 'Success') {
        this.alert.success('تم تسجيل الدخول')
        // console.log('تم تسجيل الدخول')
        localStorage.setItem('token',res.token)
        this.auth.saveUser();
        form.reset();
        this.router.navigate(['/members'])
      }else{
        this.alert.error(res.message)
        // console.log('فشل تسجيل الدخول');
      }
    }
    )
  }

  loggedIn():boolean{
    if (this.auth.loggedIn() == false) {
    localStorage.removeItem('token')
    }
    return this.auth.loggedIn()
  }

  loggedOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
