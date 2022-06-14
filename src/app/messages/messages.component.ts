import { Component, OnInit } from '@angular/core';
import { UserApi } from '../_APi/User';
import { Message } from '../_Models/message';
import { AuthService } from '../_Services/auth.service';
import { HttpService } from '../_Services/http.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  p: number = 1;
  PageSize:number = 10;
  totalItems:number = 0;
  itemPerPage:number = 0;
  MessageType:string = "Unread";
  messages:Message[] = [];
  constructor(private http:HttpService,private auth:AuthService) { }


  ngOnInit(): void {
    this.loadMessage();
  }

  pageChanged(){
    this.loadMessage();
    }

  private loadMessage(){
    this.http.Get(`${UserApi.GetMessages}${this.auth.user['_value'].nameid}?PageNumber=${this.p}&PageSize=${this.PageSize}&MessageType=${this.MessageType}`).subscribe(res=>{
      this.messages = res.data;
      this.totalItems = res.totalItems;
        this.itemPerPage = res.itemPerPage;
      // console.log(res);

    })
  }

}
