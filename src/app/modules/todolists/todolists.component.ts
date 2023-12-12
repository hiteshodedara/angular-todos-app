import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TodoPopupModelComponent } from '../todo-popup-model/todo-popup-model.component';
import { MenuItem } from 'primeng/api';
import { TodolistuiService } from 'src/app/services/todolistui.service';
import { Todoslist } from 'src/app/models/todoslist';
import { Store } from '@ngrx/store';
import { onArchiveTodolist } from 'src/app/Store/todolist/todolist.actions';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.sass'],
  providers: [DialogService]
})
export class TodolistsComponent implements OnInit {


  @Input() curruntlist!: Todoslist//currunt list data come from todos 

  totaltodos!: Todo[];//total todoitems

  currunttodos!: Todo[];//currunt list total todositems

  ref: DynamicDialogRef | undefined;//ref data for dynamicdialog
  todoslistitems: MenuItem[] | undefined;//todoslist items for is setting



  constructor(private dbdata: LocalstorageService,
    public dialogService: DialogService,
    private uilistservice: TodolistuiService,
    private store: Store) {
  }


  ngOnInit() {
    this.getalltodos();
    this.getcurrunttodolist().subscribe(res => {
      this.currunttodos = res;
    });

    //for update todolist menu

    this.todoslistitems = [
      {
        label: 'Setting',
        items: [
          {
            label: 'Archive',
            icon: 'pi pi-briefcase',
            command: () => this.setArchivelist(this.curruntlist)
          }
        ]
      }
    ];
  }

  //use for get all todos 
  getalltodos() {
    this.dbdata.getTodos().subscribe(res => {
      this.totaltodos = res
    });
  }

  //use for get specific list of todos
  getcurrunttodolist(): Observable<Todo[]> {
    return of(this.totaltodos.filter((item: { key: string }) => item.key === this.curruntlist.key));
  }

  //main delete function for delete todo item and update todos
  deleletodo(id: number) {
    this.dbdata.deleteTodo(id);
    this.ngOnInit()
  }

  //call add popup model for add todo
  Addtodo(clist: Todoslist) {
    this.ref = this.dialogService.open(TodoPopupModelComponent, {
      header: 'Add Card',
      width: '50%',
      contentStyle: { 'background-color': '#76db9b', 'color': 'black', 'overflow': 'hidden' },
      baseZIndex: 10000,
      maximizable: false,
      draggable: true,
      position: 'center',
      data: {
        curruntlist: clist,//data of currunt todolist for is name and key
      },
    });
  }


  //for make todolist archive
  setArchivelist(archivetodolist: Todoslist) {
    const currunttodolist = archivetodolist

    let id = currunttodolist.id;
    if (id) {
      this.store.dispatch(onArchiveTodolist({ aid: id }))
    } else {
      console.error("don't have id on todolist")
    }
  }

}
