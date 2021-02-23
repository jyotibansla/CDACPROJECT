import { Component, OnInit } from '@angular/core';
import { Studinfo } from '../studinfo';
import {SerOnlineExamService} from '../ser-online-exam.service';
import { ClStudRegStatus } from '../cl-stud-reg-status';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import{Clloginstud} from '../clloginstud'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 // public togglebtnappear:boolean = true;
  public togglebtnregister:boolean = false;
  public togglebtnchkreg:boolean = false;
  public toggletxtfname:boolean=false;
  public toggletxtlname:boolean=false;
  public toggletxtphone:boolean=false; 
  public toggletxtedate:boolean=false;
  public toggletxtpwd:boolean=false;
  public toggleselsub:boolean=false;
  title = "Student Registration";
  tipmsg="*Mandatory Fields";
  objstudinfo : Studinfo;
   msg:string='';
   subid:string='';
   objstudinfo1:Clloginstud;
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
         this.objstudinfo1 = new Clloginstud();
     }
	 
	 
	abc(event:any)
  {
    this.subid=event.target.value;
  }
  chkRegister_click()
  {
    this.toggletxtfname=true;
    this.toggletxtlname=true;
    this.toggletxtphone=true;
    this.toggletxtedate=true;
    this.toggletxtpwd=true;
    this.toggleselsub=true;//objuname  Clloginstud src\app\clloginstud.ts  ClStudRegStatus
    this.objstudinfo1.username=Number(this.objstudinfo.prnno);
    if(this.objstudinfo1.username == 0)
    {
      this.msg="Enter your PRN NO!";
    }
    else{
    this.so.ajaxchkisstudreg(this.objstudinfo1).subscribe
    (
      (data:ClStudRegStatus)=>{
        if(data.status==1)
        {
          this.msg="Registerd!You can take test."+data.status;//data.message;
  //        this.togglebtnappear=false;
         
        }
        else
        {
          this.msg="Not Registered for exam!Please register first!"+data.status//data.message;
        }
        this.toggletxtfname=false;
        this.toggletxtlname=false;
        this.toggletxtphone=false;
        this.toggletxtedate=false;
        this.toggletxtpwd=false;
        this.toggleselsub=false;

       },(error)=>{
        this.msg ="Unable to contact Server due to Error:";

       },()=>{
        console.log('completed');   
       }

    );
      }//else
  }
  Register_click() {
    //this.title="Reg event working";
    
    this.objstudinfo.subid=Number(this.subid);
   //this.title=this.objstudinfo.examdate.toString();
    //this.title=this.objstudinfo.prnno.toString();
   if(this.objstudinfo.prnno==0  ||this.objstudinfo.sfname==' '|| this.objstudinfo.slname==' '|| this.objstudinfo.sphone==0||this.objstudinfo.examdate==null|| this.objstudinfo.password==' ')
   {    
      this.msg="Mandatory Details should be filled!";    
   }
   else
   {
    this.so.ajaxstudinsert(this.objstudinfo).subscribe
    (
      (data:ClStudRegStatus)=>{ 
           if(data.status==1)
           {
            this.msg=data.message+"for subject: "+this.subid;            
           }
         else
            {
              this.msg=data.message;
            }
           // this.togglebtnappear=false;
       },(error)=>{
        this.msg ="Unable to contact Server due to Error:";//+" "+JSON.stringify(error);
        },()=>{
          console.log('completed');     
         }
    );
  }//else
 
         
  }


  GotoLogin()
  {
    this.ro.navigate(['/Login-component']);
  }
  ngOnInit(): void {
  }

}
