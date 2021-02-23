import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private msg:string="";
  constructor() { }

  ngOnInit(): void {
       this.msg="Logged out successfully!";
  }

}
