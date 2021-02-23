import { Component, OnInit } from '@angular/core';
import { Studinfo } from '../studinfo';
import {SerOnlineExamService} from '../ser-online-exam.service';
import { ClStudRegStatus } from '../cl-stud-reg-status';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  title = "Student Registration";
  tipmsg="*Mandatory Fields";
  objstudinfo : Studinfo;
  //prnno : number;
  //sfname : any;
  //slname : any;
  //sphone : number;
  //examdate : Date;
  //password : any;
  subname:any;
  
  constructor(private so:SerOnlineExamService,private ro:Router)
    {
         this.objstudinfo=new Studinfo();
     }
  Register_click() {
    //this.title="Reg event working";
    if (this.subname = "CPP")
    this.objstudinfo.subid=1;
    this.title=this.objstudinfo.examdate.toString();
    //this.title=this.objstudinfo.prnno.toString();
    
    this.so.ajaxstudinsert(this.objstudinfo).subscribe
    (
      (data:ClStudRegStatus)=>{ 
       
            this.title=data.message;
        
       },(error)=>{
        this.title ="ajax failed some issue in contacting"+" "+JSON.stringify(error);
        },()=>{
          console.log('completed');     
         }
    );
  }


  GotoLogin()
  {
    this.ro.navigate(['/Login-component']);
  }
  ngOnInit(): void {
  }

}
