import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component'
import { LoginComponent } from './login/login.component';
import { StudexaminfoComponent } from './studexaminfo/studexaminfo.component';
import{HomeComponent} from './home/home.component'
import {AuthGuard} from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { ExampageComponent } from './exampage/exampage.component';
import {ResultComponent} from './result/result.component'; 
import { from } from 'rxjs';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Registration-component',/*canActivate:[AuthGuard],*/component:RegistrationComponent},
  {path:'Login-component',component:LoginComponent},
  {path:'home-component',/*canActivate:[AuthGuard],*/component:HomeComponent},
  {path:'studexaminfo',component:StudexaminfoComponent},
  {path:'exampage-component',component:ExampageComponent},
  {path:'logout-component',component:LogoutComponent},
  {path:'result-component/:cnt/:total',component:ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
