import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';
import { AuthService } from './_Services/auth.service';
import { HttpService } from './_Services/http.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MemberMessageComponent } from './members/member-message/member-message.component';
import { MemberDetailResolver } from './_resolver/member-details.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directive/has-role.directive';
import { UserMangementComponent } from './admin/user-mangement/user-mangement.component';
import { PhotoMangementComponent } from './admin/photo-mangement/photo-mangement.component';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
export function tokenGetter(){
  return localStorage.getItem('token')
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    MemberMessageComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserMangementComponent,
    PhotoMangementComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    NgxGalleryModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [AuthGuard,AuthService,HttpService,MemberDetailResolver],
  entryComponents:[
    RolesModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
