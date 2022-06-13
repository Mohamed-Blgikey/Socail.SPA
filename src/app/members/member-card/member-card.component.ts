import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UserApi } from 'src/app/_APi/User';
import { User } from 'src/app/_Models/user';
import { AuthService } from 'src/app/_Services/auth.service';
import { HttpService } from 'src/app/_Services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  imgPrefix : string = environment.PhotoUrl

  @Input() user:User|undefined;
  constructor(private alert:HotToastService,private auth:AuthService,private http : HttpService) { }

  ngOnInit(): void {
  }

  makeLike(id:any){
    this.http.Post(`${UserApi.MakeLike}/${this.auth.user['_value'].nameid}/${id}`,{}).subscribe(res=>{
      console.log(res);
      if (res == null) {
        this.alert.success("تم الاعجاب")
      }else{
        this.alert.error(res.message)
      }
    }
    )
  }

}
