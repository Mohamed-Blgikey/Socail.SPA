import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }


  login(form:FormGroup){
    // console.log(form.value);
    this.auth.login(form.value).subscribe(
    res=>{
      if (res.message == 'Success') {
        console.log('تم تسجيل الدخول')
        localStorage.setItem('token',res.token)
        form.reset();
      }else{
        console.log('فشل تسجيل الدخول');
      }
    }
    )
  }

  loggedIn():boolean{
    const token = localStorage.getItem('token');
    return !! token;
  }

  loggedOut():void{
    localStorage.removeItem('token');
    console.log('تم تسجيل الخروج');

  }

}
