import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
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

  constructor(private http: HttpService, private alert: HotToastService) {}

  ngOnInit(): void {
   this.loadUsers();
  }

  private loadUsers(){
    this.http.Get(UserApi.GetUsers).subscribe(
      (res) => {
        this.users = res;
        // console.log(this.users);
      },
      (err) => {
        this.alert.error(err);
      }
    );
  }
}
