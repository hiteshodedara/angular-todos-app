import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { LoadTodolists, undoArchiveTodolist } from 'src/app/Store/todolist/todolist.actions';
import { Board } from 'src/app/models/board';
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

  sidebar_menu_item: MenuItem[] | undefined;
  archive_list_visible: boolean = false;
  todolists!: Todoslist[];
  is_sidebar_show: boolean = true;
  on_add_board: boolean = false;
  currunt_boards:any=[];
  currunt_boards_names!:string[];


  constructor(private listuiservice: TodolistuiService, private boardService: BoardsService,
    private store: Store<AppState>,private boards_service:BoardsService) {
       this.get_all_boards_name() 
       
      }
      
      ngOnInit() {
        
        this.on_sidebar_archive_list()
        this.store.dispatch(LoadTodolists())
        setTimeout(() => {
          this.on_convert_board_name_to_object()
          
        }, 200);
    
  }

  on_sidebar_archive_list() {
    this.sidebar_menu_item = [
      {
        label: 'WorkSoace',
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
              this.show_archive_list()
            }
          }
          // ,
          // {
          //   label: 'test button',
          //   icon: 'pi pi-briefcase',
          //   command: () => {
          //     this.on_convert_board_name_to_object()
          //   }
          // }
        ]
      }
    ];
  }

  show_archive_list() {
    console.log('show_archive_list() called');

    this.archive_list_visible = true;
    this.gettodoslistdata()
    this.store.dispatch(LoadTodolists())
    console.log(this.todolists);


  }

  gettodoslistdata() {
    this.store.select('todolist').subscribe(res => {
      const val = res.todolist
      const notarchivedItems = val.filter(item => item.isarchive == true);
      this.todolists = notarchivedItems
    })

  }

  undo_Archive(item: Todoslist) {
    // console.log(item);

    if (item.id) {
      const id = item.id
      this.store.dispatch(undoArchiveTodolist({ aid: id }))
      this.ngOnInit()
    }

  }

  onsidebarclose() {
    this.clsoesidebar.emit()
  }

  on_addBoard_click() {
    this.on_add_board = true;
  }

   get_all_boards_name(){
    
     this.boards_service.getAllBoards().subscribe(res=>{
    this.currunt_boards_names=res
    
    })
    
    }

    on_convert_board_name_to_object(){
      let obj:MenuItem={
        label:"",
        icon: 'pi pi-refresh',
        routerLink: ""
      };

      let data=[]
      for (let i = 0; i < this.currunt_boards_names.length; i++) {
      

        
        let data:any=this.currunt_boards_names[i]
        obj={
          label:data.title,
          icon: 'pi pi-refresh',
          routerLink:''
        }
         this.currunt_boards.push(obj)

      }
      this.on_sidebar_archive_list()
    }
}
