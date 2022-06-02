import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  registerForm :FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required]),
    firstName:new FormControl(null,[Validators.required]),
    lastName:new FormControl(null,[Validators.required]),
  })
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }
  register(form:FormGroup) {
    // console.log(form.value);
    this.auth.register(form.value).subscribe(res=>{
      if(res.message == 'Success'){
        form.reset();
        console.log('تم الإشتراك');
      }else{
        console.log(res.message);
      }
    })
  }
  cancel() {
    // console.log('ليس الأن')
    this.cancelRegister.emit(false);
  }

}
