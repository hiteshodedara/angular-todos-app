import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loginuser } from '../models/loginuser';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

 

  isUserLogin() {
   
    return true

  }

  
  
}
