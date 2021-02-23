import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clchkloginstatus } from '../clchkloginstatus';
import { SerOnlineExamService } from '../ser-online-exam.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  prn:number=0;
  sname:any;
  dataobj:any;
  temp:any;
  subject:any;
  CurrentDate = new Date();
  counter:number;
  total:number;
  grade:any;
  message:any;
  //so: any;
  loginstatus: number;
  constructor(private x:ActivatedRoute,private ro:Router,private so:SerOnlineExamService,private ao : HttpClient) { }

  ngOnInit(): void
   {
             //logic for getting user details from localstorage
      this.dataobj=JSON.parse(localStorage.getItem("loginst"));
      this.subject=this.dataobj.subname;
      this.temp=this.dataobj.username;
      var splitted=this.temp.split(" ",2);
      this.sname=splitted[0]//username from localstorage this.dataobj.username;    
      this.prn=Number(splitted[1]);//student prnno from localstorage
      //Accessing information sent from exam component and display on result
      this.counter=this.x.snapshot.params.cnt;
      this.total=this.x.snapshot.params.total;
     this.grade=this.counter>7?'A':(this.counter>5?'B':'C');
     this.message=this.grade=='A'?"Congratulations!!Well Done":this.grade='B'?"Congratulations!Good try":"Better luck next time";
  }

  logout_click()
  { //this.message="logout event";   
   
      this.so.ajaxstudlogout().subscribe((data:Clchkloginstatus)=>
      {
           this.loginstatus=0;  
           
           if(data.login==0)
           {
           //localStorage.setItem("login","false");
           //localStorage.removeItem("logout");            
           localStorage.removeItem("loginst");  
           localStorage.setItem("logout",JSON.stringify(data)); 


           this.ro.navigate(['/home-component']);
           }
          // localStorage.setItem("logout","true");
      },(error)=>
      {
              this.message="Ajax failed to get data due to some error"+JSON.stringify(error);
      },()=>
      {
        console.log("logout completed");
      });   
      
      
      localStorage.clear(); 
  }
  
}
