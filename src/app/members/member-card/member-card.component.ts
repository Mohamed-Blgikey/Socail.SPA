import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  imgPrefix : string = environment.PhotoUrl

  @Input() user:User|undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
