import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UserApi } from 'src/app/_APi/User';
import { Photo } from 'src/app/_Models/photo';
import { User } from 'src/app/_Models/user';
import { AuthService } from 'src/app/_Services/auth.service';
import { HttpService } from 'src/app/_Services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm:FormGroup|undefined;

  user:User|undefined;
  photos:Photo[] = [];
  imgPrefix = environment.PhotoUrl;

  editUserForm :FormGroup = new FormGroup({
    id:new FormControl(null,[Validators.required]),
    country:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
    introduction:new FormControl(null,[Validators.required]),
    dateOfBirth:new FormControl(null,[Validators.required]),
    lookingFor:new FormControl(null,[Validators.required]),
    interests:new FormControl(null,[Validators.required]),
  });
  constructor(private http:HttpService,private auth:AuthService,private alert:HotToastService) { }

  ngOnInit(): void {
    // console.log(this.auth.user.getValue());

    this.http.Get(UserApi.GetUser+this.auth.user['_value'].nameid).subscribe(res=>{
      this.user = res;
      this.editUserForm.controls['id'].setValue(this.user?.id)
      this.editUserForm.controls['country'].setValue(this.user?.country)
      this.editUserForm.controls['city'].setValue(this.user?.city)
      this.editUserForm.controls['dateOfBirth'].setValue(this.user?.dateOfBirth)
      this.editUserForm.controls['introduction'].setValue(this.user?.introduction)
      this.editUserForm.controls['interests'].setValue(this.user?.interests)
      this.editUserForm.controls['lookingFor'].setValue(this.user?.lookingFor)
    })
    this.http.Get(UserApi.GetUserPhotos+this.auth.user['_value'].nameid)
    .subscribe(res=>{
      this.photos = res
    })
  }

  Edit(editUserForm:FormGroup){
    // this.editForm?.reset(this.user)
    this.http.Put(UserApi.EditUser,editUserForm.value).subscribe(res=>{
      console.log(res);

    })
  }

}
