import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import {SerOnlineExamService} from './ser-online-exam.service';
import { LoginComponent } from './login/login.component';

import { HeaderComponent } from './header/header.component';
import { StudexaminfoComponent } from './studexaminfo/studexaminfo.component';
import {UserloginchkService} from './userloginchk.service';
import {AuthGuard} from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { ExampageComponent } from './exampage/exampage.component';
import { ResultComponent } from './result/result.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    StudexaminfoComponent,
    HomeComponent,
    LogoutComponent,
    ExampageComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
      HttpClientModule,    
    NgxWebstorageModule.forRoot()
  ],
  providers: [SerOnlineExamService,
            UserloginchkService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
