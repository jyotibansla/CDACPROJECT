import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserloginchkService } from '../userloginchk.service';
import { Clchkloginstatus } from '../clchkloginstatus';
import { SerOnlineExamService } from '../ser-online-exam.service';

@Component({
  selector: 'app-studexaminfo',
  templateUrl: './studexaminfo.component.html',
  styleUrls: ['./studexaminfo.component.css']
})
export class StudexaminfoComponent implements OnInit {
  message:any;
   loginstatus:number;
   objLoginStatus:Clchkloginstatus;
   msg:any;
   temp:any;
   subject:any;
   prn:any;
   dataobj:any;
   

    ngOnInit(): void {
     
      this.dataobj=JSON.parse(localStorage.getItem("loginst"));
      
      this.subject=this.dataobj.subname;
       this.temp=this.dataobj.username;
     var splitted=this.temp.split(" ",2);
     this.msg=splitted[0]//this.dataobj.username;
    
     this.prn=Number(splitted[1]);
   }
 
  
  
   //prn=this.y.snapshot.params.prn;
  constructor(private y:ActivatedRoute,private so:SerOnlineExamService,private user:UserloginchkService,private ro:Router) 
  {
     this.objLoginStatus=new Clchkloginstatus; 
  }  

  StartExam_click()
  {
    this.ro.navigate(['/exampage-component']);
  }

 
  logout_click()
  { //this.message="logout event";
    
    this.ro.navigate(['/home-component']);
      this.so.ajaxstudlogout().subscribe((data:Clchkloginstatus)=>
      {
           this.loginstatus=0;    
           localStorage.removeItem("loginst");   
      },(error)=>
      {
              this.message="Ajax failed to get data due to some error"+JSON.stringify(error);
      },()=>
      {
        console.log("logout completed");
      });
    
  }

  
}
