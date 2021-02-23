import { Component, OnInit } from '@angular/core';
import {Clloginstud} from '../clloginstud';
import {SerOnlineExamService} from '../ser-online-exam.service';
import {Clchkloginstatus} from '../clchkloginstatus';
//import { StorageServiceModule} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserloginchkService } from '../userloginchk.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  objloginstud:Clloginstud;
  objLoginStatus:Clchkloginstatus;
  title="Student Login";
  message="";
  uname:any;
  password:string;
  loginst:string="";
  constructor(private user:UserloginchkService,private ro:Router, private ao : HttpClient) { 
    this.objloginstud=new Clloginstud();
    this.objLoginStatus=new Clchkloginstatus();
  }
  StudentExamLogin()
  {    
    //this.message=this.objloginstud.username.toString()+" "+this.objloginstud.password;
    
    this.user.ajaxstudlogin(this.objloginstud).subscribe(
      (data:Clchkloginstatus)=>
      {         
         if (data.login==1)
         {
          //this.user.setLoggedIn(true);
          this.loginst=JSON.stringify(data);
          //localStorage.setItem("logout","false");
          localStorage.setItem("loginst",this.loginst)
           this.ro.navigate(['/studexaminfo']); 
           this.message=data.message;       
         }
         else{
          this.message=data.message;
         }       
           
         },
      (error)=>
      {
          this.message="Error in contacting server"+JSON.stringify(error);
      },
      ()=>
      {
          console.log('completed');   
      });   
        
  }
  ngOnInit(): void {
  }

}
