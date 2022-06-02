import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[

      {
        path:'members',
        component:MemberListComponent,
      },
      {
        path:'lists',
        component:ListsComponent,
      },
      {
        path:'messages',
        component:MessagesComponent,
      },

    ]
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'**',
    redirectTo:'home',
    pathMatch:'full'
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
