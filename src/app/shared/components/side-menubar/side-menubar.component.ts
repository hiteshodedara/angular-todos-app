import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AppState } from 'src/app/Store/app.state';
import { LoadTodolists, undoArchiveTodolist } from 'src/app/Store/todolist/todolist.actions';
import { Todoslist } from 'src/app/models/todoslist';
import { BoardsService } from 'src/app/services/boards.service';
import { TodolistuiService } from 'src/app/services/todolistui.service';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.sass']
})
export class SideMenubarComponent {

  sidebar_menu_item: MenuItem[] | undefined;
  archive_list_visible:boolean=false;
  todolists$!: Todoslist[];

  constructor(private listuiservice: TodolistuiService, private boardService: BoardsService,
    private store: Store<AppState>){}

  ngOnInit() {
    this.on_sidebar_archive_list()
    this.store.dispatch(LoadTodolists())
  }

  on_sidebar_archive_list() {
    this.sidebar_menu_item = [
      {
        label: 'Archive List',
        icon: 'pi pi-briefcase',
        command: () => {
          this.show_archive_list();
      }
      }
    ];
  }

  show_archive_list(){
    this.archive_list_visible=true;
    this.gettodoslistdata()
    this.store.dispatch(LoadTodolists())
    

  }

  gettodoslistdata() {
    this.store.select('todolist').subscribe(res => {
      const val = res.todolist
      const notarchivedItems = val.filter(item => item.isarchive == true);
      this.todolists$=notarchivedItems
    })

  }

  undo_Archive(item:Todoslist){
    // console.log(item);
    
    if(item.id){
      const id=item.id
      this.store.dispatch(undoArchiveTodolist({ aid: id }))
      this.ngOnInit()
    }

  }
}
