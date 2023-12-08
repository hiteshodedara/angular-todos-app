import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  UsersURL = "http://localhost:3000/users"

  private users: User[] = [];

  constructor(private http: HttpClient) { }


  //this function is used for get all user data
  getUsers(): Observable<User[]> {
    // return of(this.users);
    return this.http.get<User[]>(this.UsersURL)
  }

  //this function is used to get user by is id
  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${this.UsersURL}/${id}`)

  }
}
