import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { LoadTodolists } from 'src/app/Store/todolist/todolist.actions';
import { Todoslist } from 'src/app/models/todoslist';
import { BoardsService } from 'src/app/services/boards.service';
import { TodolistuiService } from 'src/app/services/todolistui.service';

@Component({
  selector: 'app-board-show',
  templateUrl: './board-show.component.html',
  styleUrls: ['./board-show.component.sass']
})
export class BoardShowComponent {
  isfavorite:boolean=true;
  todolists$!: Todoslist[]

  constructor(private listuiservice: TodolistuiService, private boardService: BoardsService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(LoadTodolists())
    this.gettodoslistdata()
  }

  gettodoslistdata() {
    this.store.select('todolist').subscribe(res => {
      const val = res.todolist
      const notarchivedItems = val.filter(item => item.isarchive != true);
      this.todolists$=notarchivedItems
    })

  }

  onclickfavorite(){
    this.isfavorite=!this.isfavorite;
  }
}
