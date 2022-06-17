import { Component } from '@angular/core';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Socail.SPA';
  /**
   *
   */
  constructor(public auth:AuthService) { }
}
