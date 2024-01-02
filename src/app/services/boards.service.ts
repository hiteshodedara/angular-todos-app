import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private boardsUrl = "http://localhost:3000/boards";

  constructor(private http: HttpClient) { }

  getAllBoards(): Observable<any[]> {
    return this.http.get<any[]>(this.boardsUrl);
  }

  

}
