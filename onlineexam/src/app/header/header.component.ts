import { Component, OnInit } from '@angular/core';
import {SerOnlineExamService} from '../ser-online-exam.service';
import {Clchkloginstatus} from '../clchkloginstatus';
import { Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UserloginchkService } from '../userloginchk.service';
import { Observable } from 'rxjs/internal/Observable';

//import { StorageServiceModule} from 'angular-webstorage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  //objLoginStatus:Clchkloginstatus;
  message:string;
   loginstatus:number;
   dataobj:any;
  constructor(private so:SerOnlineExamService,private user:UserloginchkService , private ro:Router) { 
    //this.objLoginStatus=new Clchkloginstatus();
  }
  /*logout_click()
  { this.message="logout event";
    this.user.setLoggedIn(false);
    this.ro.navigate(['/home-component']);
      this.so.ajaxstudlogout().subscribe((data:Clchkloginstatus)=>
      {
           this.loginstatus=0;       
      },(error)=>
      {
              this.message="Ajax failed to get data due to some error"+JSON.stringify(error);
      },()=>
      {
        console.log("logout completed");
      });   
  }*/
  ngOnInit(): void {
    //this.isLoggedIn$ = this.user.IsLoggedIn; 
   /* this.dataobj=JSON.parse(localStorage.getItem("logout"));
    this.loginstatus=0;
    //this.loginstatus=Number(this.dataobj.login);
  this.message=localStorage.getItem("logout");*/
  }

}
