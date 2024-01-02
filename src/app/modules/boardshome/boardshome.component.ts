import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-boardshome',
  templateUrl: './boardshome.component.html',
  styleUrls: ['./boardshome.component.sass']
})
export class BoardshomeComponent implements OnInit {

  constructor(private board_service: BoardsService) { }

  ngOnInit(): void {

    
   
  }
}
