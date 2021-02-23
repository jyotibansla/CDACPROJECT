import { Injectable } from '@angular/core';
import { SerOnlineExamService } from './ser-online-exam.service';
import { Clchkloginstatus } from './clchkloginstatus';
import { Clloginstud } from './clloginstud';
//import {Studinfo} from './studinfo';
import {ClStudRegStatus} from './cl-stud-reg-status';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class UserloginchkService {
  message: string;
  objloginstud: Clloginstud;
  private LoggedInStatus:boolean=false;
  //private LoggedInStatus=JSON.parse(localStorage.getItem('LoggedInStatus')||'false')


  constructor(private so:SerOnlineExamService,private localst:LocalStorageService,private ao : HttpClient) {
    this.objloginstud= new Clloginstud();}

   get IsLoggedIn()
   {
     return this.LoggedInStatus
     //return (JSON.parse(localStorage.getItem('LoggedInStatus')||this.LoggedInStatus.toString()));
   }

    setLoggedIn(value:boolean)
    {
      this.LoggedInStatus=value;
      //localStorage.setItem('LoggedInStatus',value.toString());
    }
    ajaxstudlogin(objlogininfo:Clloginstud):Observable<Clchkloginstatus>
  {
    //http://localhost:8081/studlogin?username=1230&password=3456
    let url:string = "http://localhost:8081/studlogin?username="+objlogininfo.username+"&password="+objlogininfo.password;
    return this.ao.get<Clchkloginstatus>(url);
  }

  
  
}
