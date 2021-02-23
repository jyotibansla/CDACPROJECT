import { Component, OnInit } from '@angular/core';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { SerOnlineExamService } from '../ser-online-exam.service';
import { Router } from '@angular/router';
import {Clunamesubid} from '../clunamesubid';
import {Clquestions} from '../clquestions';
import {Clquestionsarr} from  '../clquestionsarr';
//import {Clanstable} from '../clanstable';

//import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
//import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.css']
})
export class ExampageComponent implements OnInit {
  message:any;
  prn:number=0;
  sname:any;
  dataobj:any;
  temp:any;
  subject:any;
  CurrentDate = new Date();
  duration:number=5;
  qno:number=1;
  stem:any;

  timeLeft: number = 0;
  timeleftd:number=60;
  durationinsec:number=180;
  hours_:number = 0;
  minutes_:number =(this.durationinsec/60)-1;
  interval:any;

  opt:any;
  subj:string="";
  msg:string='';
  inputval1:any;
  inputval2:any;
  inputval3:any;
  inputval4:any;
  idval:number;
  counter:number=0;
  total:number=10;
  tuple:any;  
   selectedoption:number;
   //object for getquestions ajax call
   objunamesubid:Clunamesubid;
   objclquestions:Clquestions[];
   
  // objclanssheet:Clanstable[];
    answers:number[][];// = [[10, 20, 30], [50, 60, 70]] ;   

   //tuple declaration
  // questionstuple:[number,any,any,any,any,any,number][]=[];
  
   constructor(private so:SerOnlineExamService,private ro:Router)
   {
     this.objunamesubid=new Clunamesubid;
     //this.objclquestions=new Clquestionsarr;
    }
  ngOnInit(): void 
  {
    //logic for getting user details from localstorage
    this.dataobj=JSON.parse(localStorage.getItem("loginst"));
    this.subject=this.dataobj.subname;
       this.temp=this.dataobj.username;
     var splitted=this.temp.split(" ",2);
     this.sname=splitted[0]//username from localstorage this.dataobj.username;    
     this.prn=Number(splitted[1]);//student prnno from localstorage

     //logic for running timer
     this.durationinsec=this.durationinsec-this.timeLeft;
     this.interval = setInterval(() => {
       
      if(this.timeLeft < 60 && this.durationinsec>0) {
         this.timeLeft++;
         this.timeleftd=60-this.timeLeft;
       
       } else {
       if(this.durationinsec>0)
       {
         this.durationinsec=this.durationinsec-60;
         this.timeLeft = 0;
         this.timeleftd=60;
         this.minutes_--;
         if(this.minutes_==60)
         {
           this.hours_--;          
         }
       }
       else{
         this.timeLeft=0;
         this.timeleftd=0;
         this.pauseTimer();
         this.ro.navigate(['/result-component',this.counter,this.total]);
       }
       }
     },600)
     //end of logic for timer

     //ajax call to get questions
     this.objunamesubid.username=this.prn;          
    this.objunamesubid.subid=Number(this.dataobj.subid);  
     this.tuple=this.objunamesubid.subid;
   
     this.so.ajaxgetquestions(this.objunamesubid).subscribe
    ((data:Clquestionsarr)=>
    {  
      this.msg="ajax call successful";
      this.tuple=data.status;
      this.objclquestions=data.questions;
//      this.tuple=this.objclquestions[0].stem.toString();     
      this.stem=this.objclquestions[0].stem.toString();    
      this.inputval1= this.objclquestions[0].opt1.toString();
      this.inputval2=this.objclquestions[0].opt2.toString();
      this.inputval3=this.objclquestions[0].opt3.toString();
      this.inputval4=this.objclquestions[0].opt4.toString();
    },(error)=>
    {
       this.msg="Error in ajax call";
    },()=>
    {
        console.log("completed");
    });
      //end of ajax call
  }
  //function to pause timer called in setinterval fn in onnginit
  pauseTimer() {
    clearInterval(this.interval);
    } 
 
   /* qno_click($event : any,id:number)
  {
      this.message="QnoClick works";
      this.message=event.target.id;
  }*/

/*  abc(event:any)
  {
    this.msg=event.target.value;
  }*/
  option_click(event:any,qno:number)
  {  
    
         this.idval=event.target.id;
        
         this.selectedoption=this.idval;
         //qno=1;
         
        // this.saveoptionclick(this.selectedoption,qno);
        if (this.selectedoption==this.objclquestions[qno-1].anskey)
        {
          this.counter++;
        }    else     
       /* this.stem=this.objclquestions[this.qno-1].stem.toString();    
         this.inputval1= this.objclquestions[this.qno-1].opt1.toString();
         this.inputval2=this.objclquestions[this.qno-1].opt2.toString();
         this.inputval3=this.objclquestions[this.qno-1].opt3.toString();
         this.inputval4=this.objclquestions[this.qno-1].opt4.toString();*/
         if(this.selectedoption==1)
         {this.opt="inputval1";}
         //event.checked="true";
         //this.answers[qno-1][0]=qno;
       // this.answers[qno-1][1]=1;   } 
         else if(this.selectedoption==2)
         {this.opt="inputval2";
         //this.answers[qno-1][0]=qno;
         //this.answers[qno-1][1]=2;   
        }
         else if(this.selectedoption==3)
         {
          this.opt="inputval3";
          //event.checked="true";
          //this.answers[qno-1][0]=qno;
          //this.answers[qno-1][1]=3;   
         }
         else if(this.selectedoption==4)
         {
          //this.answers[qno-1][0]=qno;
          //this.answers[qno-1][1]=4;   
          this.opt="inputval4";
         }
        
          
          
          this.tuple=qno+"____"+this.selectedoption+"______"+this.counter+"____";

          //this.objclanssheet[this.qno-1].qno=this.qno;
          //this.objclanssheet[this.qno].selectedoption=this.selectedoption;
          //this.objclanssheet[this.qno-1].anskey=this.objclquestions[this.qno-1].anskey;         
  }
  saveoptionclick(option:number,qno:number) 
  {
  this.answers[this.qno-1][0]=qno;
  this.answers[this.qno-1][1]=option;   
  }
  qno_click(event:any)
  {            
      this.idval= event.target.id;
      this.qno=this.idval;  
     // this.msg="QnoClick works";//+this.objclanssheet[this.qno-1].selectedoption.toString();
     /*if(this.objclanssheet[this.qno-1].selectedoption==0)
     {*/
      
        //this.opt=0;
      
        this.opt=0;
      /*}
      else
      {
        this.opt=this.objclanssheet[this.qno-1].selectedoption;
      }*/
      
      this.stem=this.objclquestions[this.qno-1].stem.toString();    
      this.inputval1= this.objclquestions[this.qno-1].opt1.toString();
      this.inputval2=this.objclquestions[this.qno-1].opt2.toString();
      this.inputval3=this.objclquestions[this.qno-1].opt3.toString();
      this.inputval4=this.objclquestions[this.qno-1].opt4.toString();
     
  }
  finish_click(){
  this.ro.navigate(['/result-component',this.counter,this.total]);
  }


}
