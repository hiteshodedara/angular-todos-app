import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { LoadTodolists } from 'src/app/Store/todolist/todolist.actions';
import { Todoslist } from 'src/app/models/todoslist';
import { BoardsService } from 'src/app/services/boards.service';
import { TodolistuiService } from 'src/app/services/todolistui.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-board-show',
  templateUrl: './board-show.component.html',
  styleUrls: ['./board-show.component.sass']
})
export class BoardShowComponent {
  isfavorite:boolean=true;
  todolists$!: Todoslist[]
  b_setting_menu_item:MenuItem[] | undefined;

  constructor(private listuiservice: TodolistuiService, private boardService: BoardsService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.b_Setting_menu_item_assignement()
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

  b_Setting_menu_item_assignement(){
    this.b_setting_menu_item=[
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus',
                items: [
                    {
                        label: 'Document',
                        icon: 'pi pi-file'
                    },
                    {
                        label: 'Image',
                        icon: 'pi pi-image'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-video'
                    }
                ]
            },
            {
                label: 'Open',
                icon: 'pi pi-folder-open'
            },
            {
                label: 'Print',
                icon: 'pi pi-print'
            }
        ]
    },
    {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        items: [
            {
                label: 'Copy',
                icon: 'pi pi-copy'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ]
    },
    {
        label: 'Search',
        icon: 'pi pi-search'
    },
    {
        separator: true
    },
    {
        label: 'Share',
        icon: 'pi pi-share-alt',
        items: [
            {
                label: 'Slack',
                icon: 'pi pi-slack'
            },
            {
                label: 'Whatsapp',
                icon: 'pi pi-whatsapp'
            }
        ]
    }
    ]
  }
}
