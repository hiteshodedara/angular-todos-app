import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private boardsUrl = "http://localhost:3004/boards";

  constructor(private http: HttpClient) { }

  getAllBoards(): Observable<any[]> {
    return this.http.get<any[]>(this.boardsUrl);
  }

  getTodos(boardId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.boardsUrl}/${boardId}`).pipe(
      // Assuming that 'todos' is a property of the board object
      map((board: any) => board.todos || [])
    );
  }

  getTodosList(boardId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.boardsUrl}/${boardId}`).pipe(
      // Assuming that 'todoslist' is a property of the board object
      map((board: any) => board.todoslist || [])
    );
  }


  updatetodos() {
    const boardId = 1
    const todos = {
      id: 1723,
      key: "todo",
      title: "dipen ",
      discription: "heelllo",
      assigneduser: {
        "id": 1,
        "name": "Odedara bro"
      },
      todocreater: {
        uid: 2,
        username: "Hitesh2",
        sdate: "2023-11-27T14:10:59.358Z",
        edate: "2023-11-27T14:10:59.358Z"
      }
    }
    const url = `${this.boardsUrl}/${boardId}`;
    return this.http.put(url, { todos });
  }


}
