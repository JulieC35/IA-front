import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import * as $ from 'jquery';
import {GameBoard} from './GameBoard';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GameBoardComponent implements OnInit {

  @Input() boardGame;
  @Input() boardContainer;
  board;

  constructor(private serveurService: ServeurService) { }

  ngOnInit(): void {
    this.board = new GameBoard(5);
    this.board.generateBoardGame();
    this.addListener();
  }

  addListener() {
    const stones = document.getElementsByClassName('boardGame-stone');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < stones.length; i++) {
      // @ts-ignore
      stones[i].onclick = this.stoneClick;
    }
  }

  stoneClick(event: any) {
    console.log('stone click');
    if (!event.target.getAttribute('class').includes('active')) {
      const coord = event.target.id;
      const idJquery = '#' + coord;
      console.log(idJquery);
      $(event.target).addClass('active');
      console.log(event.target);
      console.log(coord);
    }
  }


}
