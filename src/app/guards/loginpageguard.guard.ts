import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginuserService } from '../services/loginuser.service';

@Injectable({
  providedIn: 'root',
})
export class LoginPageGuard implements CanActivate {

  
  constructor(private router: Router, private loginuser: LoginuserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let login: boolean = this.loginuser.isUserLogin()

    if (!login) {
      return true;
    } else {
      // If logged in, navigate to the login page
      this.router.navigate(['/a']);
      return false;
    }
  }
}

