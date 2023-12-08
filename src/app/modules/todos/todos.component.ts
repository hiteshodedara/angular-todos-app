import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
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
  blocks!: Todoslist[];//variable for set ui element in display
  addtodolistvisible: boolean = false;
  todolistlength!: number

  todolistform = new FormGroup({
    todolistname: new FormControl(''),
  });



  constructor(private listuiservice: TodolistuiService, private boardService: BoardsService) {


  }



  ngOnInit(): void {


    this.gettodoslistdata()
  }





  gettodoslistdata() {



    this.listuiservice.getAllTodolists().subscribe(res => {
      let val = res

      //filter for archive
      let ans = val.filter((item) => {
        return item.isarchive == false
      })

      this.blocks = ans
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


  //for a get length of todolist elements
  getlengthoftodolist() {
    this.listuiservice.getAllTodolists().subscribe(res => {
      this.todolistlength = res.length
    })
  }


  //this function is used to add new todoslist in database
  ontodolistsubmit() {
    let val = this.todolistform.value.todolistname

    this.getlengthoftodolist()

    setTimeout(() => {
      if (val) {
        let forkey = (val + (Math.round(Math.random() * 1000)))
        let obj: Todoslist = {
          key: forkey,
          name: val,
          isarchive: false,
          index: this.todolistlength + 1
        }
        this.addtodolistvisible = !this.addtodolistvisible;

        //add in todoslist data
        this.listuiservice.addTodolist(obj).subscribe(res => {
          console.log("Success");
        }, error => {
          console.log("error");
        })

        this.ngOnInit()
        this.todolistform.reset()
      }
    }, 1000)
  }
}
