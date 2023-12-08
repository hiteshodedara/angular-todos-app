import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todoslist } from '../models/todoslist';

@Injectable({
  providedIn: 'root'
})
export class TodolistuiService {

  private configUrl = 'http://localhost:3000/todoslists';//url for json server

  constructor(private http: HttpClient) { }

  //this function use for get all todolist data
  getAllTodolists(): Observable<Todoslist[]> {
    return this.http.get<Todoslist[]>(this.configUrl);
  }

  //this function is use for add todolist 
  addTodolist(listdata: Todoslist) {
    return this.http.post(this.configUrl, listdata)
  }

  //this function is us for update todolist
  updateTodolist(id: any, item: Todoslist) {
    return this.http.put(`${this.configUrl}/${id}`, item)
  }

}