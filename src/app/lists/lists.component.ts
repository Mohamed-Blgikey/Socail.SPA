import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UserApi } from '../_APi/User';
import { User } from '../_Models/user';
import { HttpService } from '../_Services/http.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  users: User[] = [];
  p: number = 1;
  PageSize:number = 10;
  totalItems:number = 0;
  itemPerPage:number = 0;
  GenderFilter:number = 0;
  likers:boolean = false;
  likees:boolean = true;
  constructor(private http:HttpService,private alert:HotToastService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  changeSize(size:any){
    this.PageSize = size.target.value;
    this.loadUsers();
  }
  pageChanged(){
    this.loadUsers();

    }

  loadlikers(a:boolean){
    if (a == true) {
      this.likers = true;
      this.likees = false;
      this.loadUsers();
    }else{
      this.likers = false;
      this.likees = true;
      this.loadUsers();
    }
  }
  private loadUsers(){
    this.http.Get(`${UserApi.GetUsers}?PageNumber=${this.p}&PageSize=${this.PageSize}&Likers=${this.likers}&Likees=${this.likees}`).subscribe(
      res => {
        // console.log(res);

        this.users = res.data;
        this.totalItems = res.totalItems
        this.itemPerPage = res.itemPerPage
        // console.log(this.users);

      }
    );
}

}
