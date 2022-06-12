import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../_Services/auth.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ]),
    },
    { validators: passwordsMatchValidator() }
  );
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  register(form: FormGroup) {

    // console.log(form.value);
    if (form.controls['gender'].value === "0") {
      form.controls['gender'].setValue(0);
    }else{
      form.controls['gender'].setValue(1);
    }

    this.auth.register(form.value).subscribe((res) => {
      if (res.message == 'Success') {
        form.reset();
      console.log('تم الإشتراك');
      } else {
        console.log(res.message);
      }
    });
  }
  cancel() {
    // console.log('ليس الأن')
    this.cancelRegister.emit(false);
  }
}
