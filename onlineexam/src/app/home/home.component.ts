import { Component, OnInit } from '@angular/core';
import { UserloginchkService } from '../userloginchk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title:string="";
  constructor(private user:UserloginchkService,private ro:Router) { }

  ngOnInit(): void 
  {
    this.title="Welcome to Online Examination System!";
   
  }

}
