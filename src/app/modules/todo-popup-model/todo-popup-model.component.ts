import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Todo } from 'src/app/models/todo';
import { Todoslist } from 'src/app/models/todoslist';
import { User } from 'src/app/models/user';
import { BoardsService } from 'src/app/services/boards.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TodolistuiService } from 'src/app/services/todolistui.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-todo-popup-model',
  templateUrl: './todo-popup-model.component.html',
  styleUrls: ['./todo-popup-model.component.sass']
})
export class TodoPopupModelComponent {

  clistvalue!: Todoslist;
  uptodo!: Todo;
  isAddMode!: boolean;
  lists!: Todoslist[];
  selectedlistname!: Todoslist;
  titlevalue!: string;
  descvalue!: string;
  userlist!: User[];
  selecteduser!: User;

  constructor(public config: DynamicDialogConfig, private dbdata: LocalstorageService,
    private uidata: TodolistuiService, private usersdata: UsersService, private boardservice: BoardsService) {

    //geting data from uidata serveice for select option 
    this.uidata.getAllTodolists().subscribe(res => {
      this.lists = res
    })

    //this data use whan add todo called to add
    if (this.config.data.curruntlist) {
      this.clistvalue = this.config.data.curruntlist//currunt list value meance currunt uielement list data 
      this.isAddMode = true//set addmode for form ui for is add or update 
      this.selectedlistname = this.clistvalue //it's only to show currunt list name
      console.log("i am add");
    }


    //this condition work for whan data come from todoitem for update
    if (this.config.data.todovalues && this.config.data.cfromupdate) {
      this.uptodo = this.config.data.todovalues;//this variable have todoitem data that come for update
      this.selectedlistname = this.config.data.cfromupdate//this variable for store currunt list data for selected option
      this.selecteduser = this.config.data.todovalues.assigneduser
      console.log(this.selecteduser);



      this.titlevalue = this.uptodo.title//variable for ngmodal to show title value in input
      this.descvalue = this.uptodo.discription//variable for ngmodal to show discription value in input
      this.isAddMode = false//set addmode for form ui for is add or update
    }

    //get all user data for assigne to todo
    usersdata.getUsers().subscribe(result => {
      this.userlist = result
      console.log(this.userlist);

    })

  }


  ngOnInit(): void {

  }
  //for custom model baground color
  foroplist: { [klass: string]: any } = {
    'color': '#fff'
    , 'width': '200px',
    'background-color': 'white'
  }

  //whan user click on add todo
  addcardinlist() {
    if (this.titlevalue && this.descvalue) {

      const currentDate: Date = new Date();


      //get all data for todo object
      let obj: Todo = {
        id: Math.round(Math.random() * 2000),
        key: this.clistvalue.key,
        title: this.titlevalue,
        discription: this.descvalue,
        assigneduser: {
          id: this.selecteduser.id,
          name: this.selecteduser.name
        },
        todocreater: {
          uid: 1,
          username: 'Hitesh',
          sdate: currentDate,
          edate: currentDate
        }
      }

      this.dbdata.addTodo(obj)//sent data to service for store data in local storage
      window.location.reload();//bug but use for update ui 
    } else {
      console.log("enter values");

    }
  }

  //whan user click on update button
  Updatetodo() {
    let id = this.uptodo.id;//todo id for find todo in storage
    let val = this.selectedlistname.key;//todo key for is list storage
    let tit = this.titlevalue;//value for is title text
    let dis = this.descvalue;//value for is discription
    let auser = this.selecteduser;

    this.dbdata.updateTodoKey(id, val, tit, dis, auser)//sent data to service to update todo data
    window.location.reload()//bug but use for update ui
  }
}
