import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode:boolean = false;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/members'])
    }
  }

  registerToggel(){
    this.registerMode  = true;
  }
  cancelRegister(event:boolean){
    this.registerMode = event;
  }

}
