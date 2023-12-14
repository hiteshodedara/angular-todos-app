import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { LoadTodolists, addTodolist } from 'src/app/Store/todolist/todolist.actions';
import { selectAllTodolist } from 'src/app/Store/todolist/todolist.selectors';
import { TodolistState, TodolistinitialState } from 'src/app/Store/todolist/todolist.state';
import { Todoslist } from 'src/app/models/todoslist';
import { BoardsService } from 'src/app/services/boards.service';
import { TodolistuiService } from 'src/app/services/todolistui.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass'],
  providers: []
})
export class TodosComponent implements OnInit {

  isfavorite: boolean = true;
  addtodolistvisible: boolean = false;
  todolists$!: Todoslist[]
  todolistform = new FormGroup({
    todolistname: new FormControl(''),
  });

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
      const archivedItems = val.filter(item => item.isarchive != true);

      this.todolists$=archivedItems

    })

  }

  //this function for set favorite list (not completed)
  onclickfavorite() {
    this.isfavorite = !this.isfavorite



  }


  // this used for open a dialog box for add todoslist
  showDialog() {
    this.addtodolistvisible = true
  }

  //this used for close dialog box of todoslist
  onClickClose() {
    this.addtodolistvisible = false

  }





  //this function is used to add new todoslist in database
  ontodolistsubmit() {
    let val = this.todolistform.value.todolistname


    if (val) {
      let forkey = (val + (Math.round(Math.random() * 1000)))
      let obj: Todoslist = {
        key: forkey,
        name: val,
        isarchive: false,
        index: this.todolists$.length + 1
      }
      this.addtodolistvisible = !this.addtodolistvisible;

      //add in todoslist data
      console.log(obj);

      this.store.dispatch(addTodolist({ newtodolist: obj }))


      this.todolistform.reset()
    }
  }
}
