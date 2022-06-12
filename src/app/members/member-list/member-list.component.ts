import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Pagination } from 'src/app/_Models/pagination';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserApi } from '../../_APi/User';
import { User } from '../../_Models/user';
import { HttpService } from '../../_Services/http.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  p: number = 1;
  totalItems:number = 0;
  itemPerPage:number = 0;
  GenderFilter:number = 0;

  constructor(private http: HttpService, private alert: HotToastService,private auth:AuthService) {}


  ngOnInit(): void {
    this.GenderFilter = this.auth.user['_value'].gender == 1? 0:1;
   this.loadUsers(1,6,this.GenderFilter);
  }

  pageChanged(){
    this.loadUsers(this.p,6,this.GenderFilter)

    }

    changeusers(a:any){
      this.GenderFilter = a.target.value;
      this.loadUsers(this.p,6,this.GenderFilter)
    }

  private loadUsers(PageNumber?:number,PageSize:number = 10,Gender?:Number){
      this.http.Get(`${UserApi.GetUsers}?PageNumber=${PageNumber}&PageSize=${PageSize}&Gender=${Gender}`).subscribe(
        (res) => {
          this.users = res.data;
          this.totalItems = res.totalItems
          this.itemPerPage = res.itemPerPage
        },
        (err) => {
          this.alert.error(err);
        }
      );
  }
}
