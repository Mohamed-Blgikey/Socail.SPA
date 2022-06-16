import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Admin } from 'src/app/_APi/Admin';
import { User } from 'src/app/_Models/user';
import { HttpService } from 'src/app/_Services/http.service';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.scss']
})
export class UserMangementComponent implements OnInit {

  users:User[] = [];
  user:User|undefined;
  roles:any[]=[];
  constructor(private http:HttpService,private alert:HotToastService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.http.Get(Admin.GetUserWithRoles).subscribe(res=>{
      this.users = res;
      // console.log(this.users);

    })
  }

  getUser(user:User){
    this.user = user;
    // console.log(user);

    this.roles = this.getRolesArray(this.user)
  }

  private getRolesArray(user:User) {
    const roles:any = [];
    const userRoles = user.roles as Array<string>;
    const availableRoles: any[] = [
      {name: 'مدير النظام', value: 'Admin'},
      {name: 'مشرف', value: 'Modirator'},
      {name: 'عضو', value: 'User'},
    ];

    availableRoles.forEach(aRole=>{
      let isMatch =false;
      userRoles.forEach(uRole=>{
        if(aRole.value===uRole){
          isMatch=true;
          aRole.checked = true;
          roles.push(aRole);
          return;
         }
      })
      if(!isMatch){
        aRole.checked=false;
        roles.push(aRole);
      }
    })
    // console.log(roles);
    return roles;

  }


 editUser(){

  let userRoles:any [] = [];

  this.roles.forEach(e=>{
    if (e.checked)
      userRoles.push(e.value)
  })


  let obj = {
    roleNames:userRoles
  }
  // console.log(this.user?.id,obj);

  this.http.Post(`${Admin.EditRoles}${this.user?.id}`,obj).subscribe(res=>{
    console.log(res);

  })
 }

}
