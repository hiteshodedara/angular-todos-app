import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Todo } from 'src/app/models/todo';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TodoPopupModelComponent } from '../todo-popup-model/todo-popup-model.component';
import { Todoslist } from 'src/app/models/todoslist';

@Component({
  selector: 'app-todoitems',
  templateUrl: './todoitems.component.html',
  styleUrls: ['./todoitems.component.sass'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class TodoitemsComponent {
  @Input() curruntlist!: Todoslist;//curruntlistname data come from todolist

  @Input() items!: Todo;//todoitem data come from todolist 

  @Output() tododelete: EventEmitter<number> = new EventEmitter();

  ref: DynamicDialogRef | undefined;//ref data for dynamicdialog

  cuser!: string;//user short name
  fulluname!: string;//user full name

  constructor(private messageService: MessageService, private dbdata: LocalstorageService, public dialogService: DialogService,
    private confirmationService: ConfirmationService) {

  }

  //name converter
  getInitials(userName: string): string {
    const words = userName.split(' ');
    const initials = words.map(word => word.charAt(0));

    return initials.join('');
  }

  ngOnInit() {

    //creating currunt todoitem user name in short
    this.fulluname = this.items.assigneduser.name
    this.cuser = this.getInitials(this.fulluname)




  }

  // this is use for style data of dyanamic popup backgrount
  confirmPopupStyles: { [klass: string]: any } = {
    'background-color': '#76db9b',
    'color': '#000'
  }



  //for Delete items in list
  showConfirmationDialog(id: number, event: Event) {
    //code for popover for delete
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Delete?',
      icon: 'pi pi-trash',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-success', // the custom class for the accept button
      rejectButtonStyleClass: 'p-button-danger', // the custom class for the reject button
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Todo ', detail: 'Deleted' });//toast for accept

        setTimeout(() => {
          this.emitedeletedata(id)
        }, 1000);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Todo ', detail: 'Not Deleted' });//toast for reject
      },

    });

  }
  //for delete todo
  emitedeletedata(id: number) {
    this.tododelete.emit(id)
  }




  //for sent to popup-model for update todoitem
  Updatetodo(item: Todo) {
    this.ref = this.dialogService.open(TodoPopupModelComponent, {
      header: 'Update Todo',
      width: '50%',
      contentStyle: { 'background-color': '#76db9b', 'color': 'black', 'overflow': 'hidden' },
      baseZIndex: 10000,
      maximizable: false,
      draggable: true,
      position: 'center',
      data: {
        todovalues: item, //currunt item
        cfromupdate: this.curruntlist//currunt listname object    
      },
    });
  }
}
