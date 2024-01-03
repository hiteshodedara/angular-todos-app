import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private boardsUrl = "http://localhost:3000/boards";
  private todosurl= "http://localhost:3000/todos";

  constructor(private http: HttpClient) { }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.boardsUrl);
  }

  add_board(boards:Board){
    return this.http.post(this.boardsUrl,boards);
  }
  
  

}
