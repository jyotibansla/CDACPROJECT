import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Studinfo} from './studinfo';
import {ClStudRegStatus} from './cl-stud-reg-status';
import {Clloginstud} from './clloginstud';
import {Clchkloginstatus} from './clchkloginstatus';
import {Clunamesubid} from './clunamesubid';
import {Clquestions} from './clquestions';
import { Clquestionsarr } from './clquestionsarr';

@Injectable({
  providedIn: 'root'
})
export class SerOnlineExamService {
 
  constructor(private ao : HttpClient) { }

  
  ajaxstudinsert(objstudinfo:Studinfo):Observable<ClStudRegStatus>
  {
    let url:string ="http://localhost:8081/insert";
    return this.ao.post<ClStudRegStatus>(url,objstudinfo);
  }
 /* ajaxstudlogin(objlogininfo:Clloginstud):Observable<Clchkloginstatus>
  {
    //http://localhost:8081/studlogin?username=1230&password=3456
    let url:string = "http://localhost:8081/studlogin?username="+objlogininfo.username+"&password="+objlogininfo.password;
    return this.ao.get<Clchkloginstatus>(url);
  }*/
  ajaxstudlogout():Observable<Clchkloginstatus>
  {
    let url:string ="http://localhost:8081/logout";
    return this.ao.get<Clchkloginstatus>(url);
  }
   ajaxisuserloggedin(objuname:Clloginstud):Observable<Clchkloginstatus>
   {
     let url:string ="http://localhost:8081/isuserloggedin?username="+objuname.username;
     return this.ao.get<Clchkloginstatus>(url);
   }
   ajaxchkisstudreg(objstudinfo1:Clloginstud):Observable<ClStudRegStatus>{
    let url:string ="http://localhost:8081/chkifuserreg?p1="+objstudinfo1.username;
    return this.ao.get<ClStudRegStatus>(url);
   }
   //http://localhost:8081/getexamquestions?username=1201&subid=2
   ajaxgetquestions(objunamesubid:Clunamesubid):Observable<Clquestionsarr>
   {
      let url:string="http://localhost:8081/getexamquestions?username="+objunamesubid.username+"&subid="+objunamesubid.subid;
      return this.ao.get<Clquestionsarr>(url);
   }

  }