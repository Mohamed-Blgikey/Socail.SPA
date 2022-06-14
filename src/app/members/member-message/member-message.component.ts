import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApi } from 'src/app/_APi/User';
import { Message } from 'src/app/_Models/message';
import { AuthService } from 'src/app/_Services/auth.service';
import { HttpService } from 'src/app/_Services/http.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss']
})
export class MemberMessageComponent implements OnInit ,AfterViewChecked{

  @Input() recipientId:string|any;
  @ViewChild('panel') panel:any;
  sendForm:FormGroup = new FormGroup({
    senderId:new FormControl(null,[Validators.required]),
    resipientId:new FormControl(null,[Validators.required]),
    content:new FormControl(null,[Validators.required]),
  })
  messages:Message[]=[];
  constructor(private http:HttpService,private auth:AuthService) { }

  ngAfterViewChecked(): void {
    this.panel.nativeElement.scrollTop = this.panel?.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    // console.log(this.recipientId);
    this.sendForm.controls['senderId'].setValue(this.auth.user['_value'].nameid);
    this.sendForm.controls['resipientId'].setValue(this.recipientId);
    // console.log(this.sendForm.value);


    this.http.Get(`${UserApi.GetConversation}${this.auth.user['_value'].nameid}/${this.recipientId}`).subscribe(res=>{
      // console.log(res);
      this.messages = res
    })
  }

  Send(sendForm:FormGroup){
    // console.log(sendForm.value);
    this.http.Post(UserApi.CreateMessage,sendForm.value).subscribe(res=>{
      // console.log(res);
      this.messages.push(res)
      sendForm.reset();
    })
  }

}
