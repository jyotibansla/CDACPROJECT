import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserloginchkService } from './userloginchk.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user:UserloginchkService,private route:Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.user.IsLoggedIn == true)
      {
        return false
      }
     
     else{
       return true
     }/*if(!(this.user.IsLoggedIn ==true))
     {
       this.route.navigate(['/home-component']);
     }
     return this.user.IsLoggedIn;*/
  
}}
