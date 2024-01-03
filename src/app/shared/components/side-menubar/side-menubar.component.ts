import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators'; // Update import
import { AppState } from 'src/app/Store/app.state';
import { LoadTodolists, undoArchiveTodolist } from 'src/app/Store/todolist/todolist.actions';
import { Board } from 'src/app/models/board';
import { Todo } from 'src/app/models/todo';
import { Todoslist } from 'src/app/models/todoslist';
import { BoardsService } from 'src/app/services/boards.service';
import { TodolistuiService } from 'src/app/services/todolistui.service';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.sass']
})
export class SideMenubarComponent {

  @Output() clsoesidebar: EventEmitter<number> = new EventEmitter();

  sidebar_menu_item: MenuItem[] = [];
  archive_list_visible = false;
  todolists: Todoslist[] = [];
  is_sidebar_show = true;
  on_add_board = false;
  currunt_boards: any;
  currunt_boards_data: Board[] = [];

  todos: Todo[] = [];

  newboardform = new FormGroup({
    newboardname: new FormControl(''),
  });

  constructor(private listuiservice: TodolistuiService, private boardService: BoardsService,
    private store: Store<AppState>, private boards_service: BoardsService) {
  }

  ngOnInit() {
    this.on_sidebar_archive_list();
    this.store.dispatch(LoadTodolists());
      this.get_all_boards()
  }

  on_sidebar_archive_list() {
    this.sidebar_menu_item = [
      {
        label: 'WorkSpace',
        items: [
          {
            label: 'Boards',
            icon: 'pi pi-table',
            routerLink: 'boardshome'
          },
          {
            label: 'Members',
            icon: 'pi pi-users',
            routerLink: 'boardsmembers'
          }
        ]
      },
      {
        label: `Your Boards`,
        escape: false,
        items: this.currunt_boards
      },
      {
        label: 'Your Settings',
        items: [
          {
            label: 'Archive List',
            icon: 'pi pi-briefcase',
            command: () => {
              this.show_archive_list();
            }
          }
        ]
      }
    ];
  }

  show_archive_list() {
    this.archive_list_visible = true;
    this.gettodoslistdata();
    this.store.dispatch(LoadTodolists());
  }

  gettodoslistdata() {
    this.store.select('todolist').subscribe(res => {
      const val = res.todolist;
      const notarchivedItems = val.filter(item => item.isarchive === true);
      this.todolists = notarchivedItems;
    });
  }

  undo_Archive(item: Todoslist) {
    if (item.id) {
      const id = item.id;
      this.store.dispatch(undoArchiveTodolist({ aid: id }));
      this.ngOnInit();
    }
  }

  onsidebarclose() {
    this.clsoesidebar.emit();
  }

  on_addBoard_click() {
    this.on_add_board = !this.on_add_board;
  }

  get_all_boards() {
    this.boards_service.getAllBoards().subscribe(res => {
      this.currunt_boards_data = res;      
    });
    
  }

  on_convert_board_name_to_object() {
    
    let data= this.currunt_boards_data.map((board: any) => ({
      label: board.title,
      icon: 'pi pi-refresh',
      routerLink: `board/${board.title}`
    }));

    setTimeout(() => {
      console.log(data);
      
    }, 2000);

    return data
    
  }

  onboard_submit() {
    if (this.newboardform.valid) { // Check if the form is valid before proceeding
      const title: any = this.newboardform.value.newboardname;
      let obj: Board = {
        title: title,
        todolists: [],
        isFavarate: false
      };

      this.boardService.add_board(obj).subscribe(res => {
        console.log("Successfully added board in JSON server!");
      });
      this.newboardform.reset();
      this.get_all_boards();
      this.currunt_boards = this.on_convert_board_name_to_object(); // Update current boards
      this.on_addBoard_click();
    }
  }
}
