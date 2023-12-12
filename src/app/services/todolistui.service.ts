import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todoslist } from '../models/todoslist';

@Injectable({
  providedIn: 'root'
})
export class TodolistuiService {

  private configUrl = 'http://localhost:3000/todoslists';//url for json server

  constructor(private http: HttpClient) { }


  //get single todolist values for use
  private todolistitem!:Todoslist
  private todolistitemset(id:number){
    this.gettodolist(id).subscribe(res=>{
      this.todolistitem=res
    })
    
  }


  //this function use for get all todolist data
  getAllTodolists(): Observable<Todoslist[]> {
    return this.http.get<Todoslist[]>(this.configUrl);
  }

  //get single todolist
  gettodolist(id:number):Observable<Todoslist>{
    return this.http.get<Todoslist>(`${this.configUrl}/${id}`)
  }

  //this function is use for add todolist 
  addTodolist(listdata: Todoslist) {
    return this.http.post(this.configUrl, listdata)
  }

  //this function is us for update todolist
  updateTodolist(id: any) {
    
    const obj={
      isarchive:true
    }
    return this.http.patch(`${this.configUrl}/${id}`,obj)
  }

}