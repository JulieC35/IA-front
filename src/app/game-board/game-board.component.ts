import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';
type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
type PromiseReject = (error?: any) => void;

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GameBoardComponent implements OnInit {

  @Input() boardGame;
  @Input() boardContainer;

  columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  rows = ['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

  yourTurn: boolean;
  endOfGame = false;

  constructor(private serveurService: ServeurService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.boardGame);
    this.addCoordBeforeBoard();
    this.createColums();
    this.createLines();
    this.createDiamondCenter();
    this.createSquareCenter();
    this.addColor();
    this.addStones();
    this.addCoord();
    this.addListener();
    // tslint:disable-next-line:triple-equals
    this.yourTurn = (this.route.snapshot.params.idJoueur == 'J1');
    while (!this.endOfGame) {
      this.getServeurMessagePromise();
    }
  }

  getServeurMessagePromise() {
    return new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      this.serveurService.socket.onmessage = (event) => {
        const datas = event.data.split(' ');
        const command = datas[0];
        switch (command) {
          case'$AWAITING':
            this.yourTurn = false;
            break;
          case '$READY':
            this.yourTurn = true;
            break;
          case '$OPPONENT':
            const coord = datas[1];
            let classname = 'active';
            if (document.URL.split('gameBoard/')[1].split('/')[1] == 'J1') {
              classname += ' white';
            } else {
              classname += ' black';
            }
            const idJquery = '#' + coord;
            $(idJquery).addClass(classname);
            break;
          case '=':
            console.log('capturés: ' + datas[1]);
            break;
          default:
            reject(event.data);
        }
      };
    });
  }

  addListener() {
    const stones = document.getElementsByClassName('boardGame-stone');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < stones.length; i++) {
      this.getStoneClickPromise(stones[i]).then(
        data => {
          if (this.yourTurn) {
            const classname = data[0];
            const target = data[1];
            const coord = data[2];
            console.log(coord);
            this.serveurService.sendMessage(coord);
            $(target).addClass(classname);
            this.yourTurn = !this.yourTurn;
          } else {
            console.log('Ce n\'est pas ton tour !');
          }
        });
    }
  }

  getStoneClickPromise(stone) {
    return new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      stone.onclick = (event) => {
        if (!event.target.getAttribute('class').includes('active')) {
          let classname;
          if (document.URL.split('gameBoard/')[1].split('/')[1] == 'J1') {
            classname = 'active black';
          } else {
            classname = 'active white';
          }
          const data = [classname, event.target, event.target.id];
          resolve(data);
        } else {
          reject('Pierre déjà placée !');
        }
      };
    });
  }

  createColums() {
    let htmlBoardCoordH = '<div class="board-coord-bar horizontal">';

    for (let i = 0; i < 12; i++) {
      htmlBoardCoordH += '<div class="board-coord">' + this.columns[i] + '</div>';
    }
    htmlBoardCoordH += '</div>';
    document.getElementById('boardGame').innerHTML += htmlBoardCoordH;
    let htmlColumnLayer = '<div class="board-layer">';
    for (let i = 0; i < 12; i++) {
      htmlColumnLayer += '<div class="board-column">';
      for (let j = 0; j < 11; j++) {
        htmlColumnLayer += '<div class="board-verticalLine"></div>';
      }
      htmlColumnLayer += '</div>';
    }
    htmlColumnLayer += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    document.getElementById('boardGame').innerHTML += (htmlColumnLayer);
  }

  createLines() {
    let htmlRowLayer = '<div class="board-layer fldc">';
    for (let i = 0; i < 12; i++) {
      htmlRowLayer += '<div class="board-row">';
      for (let j = 0; j < 11; j++) {
        htmlRowLayer += '<div class="board-horizonalLine"></div>';
      }
      htmlRowLayer += '</div>';
    }
    htmlRowLayer += '</div>';
    // Ajout du code à l'intérieur de la balise boardGame
    document.getElementById('boardGame').innerHTML += htmlRowLayer;
  }

  createDiamondCenter() {
    let htmlDiamondCenterLayer = '<div class="board-layer fldc">';
    for (let i = 0; i < 12; i++) {
      if (i === 0) {
        htmlDiamondCenterLayer += '<div class="board-diamondCenter-row' + (i === 0 ? ' first' : '') + '"></div>';
      } else {
        htmlDiamondCenterLayer += '<div class="board-diamondCenter-row">';

        let nbLosange = 6;
        if (i % 2 === 0) {
          nbLosange = 5;
        }

        for (let j = 0; j < nbLosange; j++) {
          htmlDiamondCenterLayer += '<div class="board-diamondCenter-line"></div>';
        }
        htmlDiamondCenterLayer += '</div>';
      }
    }
    htmlDiamondCenterLayer += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    document.getElementById('boardGame').innerHTML += htmlDiamondCenterLayer;
  }

  createSquareCenter() {
    // Création des diagonales des carrés
    let htmlSquareCenterLayer = '<div class="board-layer fldc">';
    for (let i = 0; i < 11; i++) {
      htmlSquareCenterLayer += '<div class="board-squareCenter-row">';

      let nbCarres = 6;
      if (i % 2 === 0) {
        nbCarres = 5;
      }

      for (let j = 0; j < nbCarres; j++) {
        htmlSquareCenterLayer += '<div class="board-squareCenter-line"></div>';
        htmlSquareCenterLayer += '<div class="board-squareCenter-line"></div>';
      }
      htmlSquareCenterLayer += '</div>';
    }

    htmlSquareCenterLayer += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    document.getElementById('boardGame').innerHTML += htmlSquareCenterLayer;
  }

  addColor() {
    // Ajout des carrés de couleur
    let htmlSquareColorLayer = '<div class="board-layer fldc color">';
    for (let i = 0; i < 11; i++) {
      htmlSquareColorLayer += '<div class="board-squareColor-row">';

      let nbCarres = 6;
      if (i % 2 === 0) {
        nbCarres = 5;
      }

      for (let j = 0; j < nbCarres; j++) {
        htmlSquareColorLayer += '<div class="board-squareColor-square"></div>';
      }
      htmlSquareColorLayer += '</div>';
    }

    htmlSquareColorLayer += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    document.getElementById('boardGame').innerHTML += htmlSquareColorLayer;
  }

  addStones() {
    // Ajout des pierres
    let htmlStoneLayer = '<div class="board-layer fldc stone">';

    let indexRows = 0;
    let indexColumns = 0;
    for (let i = 0; i < 6; i++) {
      // Ligne sans offset
      htmlStoneLayer += '<div class="boardGame-stones-row">';
      for (let j = 0; j < 12; j++) {
        const id = this.columns[j] + ',' + this.rows[indexRows];
        htmlStoneLayer += '<div class="boardGame-stone" id="' + id + '"></div>';
      }
      htmlStoneLayer += '</div>';

      // Ligne square
      htmlStoneLayer += '<div class="boardGame-stones-row squareCenter">';
      indexColumns = 1;
      for (let j = 0; j < 5; j++) {
        const id = this.columns[indexColumns] + '-' + this.columns[indexColumns + 1] + ','
          + this.rows[indexRows + 1] + '-' + this.rows[indexRows];
        htmlStoneLayer += '<div class="boardGame-stone" id="' + id + '"></div>';
        indexColumns += 2;
      }
      htmlStoneLayer += '</div>';

      indexRows++;

      // Ligne sans offset
      htmlStoneLayer += '<div class="boardGame-stones-row offset">';
      for (let j = 0; j < 12; j++) {
        const id = this.columns[j] + ',' + this.rows[indexRows];
        htmlStoneLayer += '<div class="boardGame-stone " id="' + id + '"></div>';
      }
      htmlStoneLayer += '</div>';

      if (i < 5) {
        // Ligne square
        htmlStoneLayer += '<div class="boardGame-stones-row squareCenter no-offset">';
        indexColumns = 0;
        for (let j = 0; j < 6; j++) {
          const id = this.columns[indexColumns] + '-' + this.columns[indexColumns + 1] + ','
            + this.rows[indexRows] + '-' + this.rows[indexRows + 1];
          htmlStoneLayer += '<div class="boardGame-stone" id="' + id + '"></div>';
          indexColumns += 2;
        }
        htmlStoneLayer += '</div>';
      }

      indexRows++;

    }

    htmlStoneLayer += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    document.getElementById('boardGame').innerHTML += htmlStoneLayer;
  }

  addCoordBeforeBoard() {
    let htmlBoardCoord = '<div class="board-coord-bar">';
    for (let i = 0; i < 12; i++) {
      htmlBoardCoord += '<div class="board-coord">' + this.rows[i] + '</div>';
    }
    htmlBoardCoord += '</div>';
    document.getElementById('boardContainer').innerHTML += htmlBoardCoord;
    const board = '<div class="board" id="boardGame" >\n' +
      '  </div>';
    document.getElementById('boardContainer').innerHTML += board;
  }

  addCoord() {
    // Ajout des coordonnées sur le côté du plateau
    let htmlBoardCoord = '<div class="board-coord-bar">';
    for (let i = 0; i < 12; i++) {
      htmlBoardCoord += '<div class="board-coord">' + this.rows[i] + '</div>';
    }
    htmlBoardCoord += '</div>';

    // Ajout du code à l'intérieur de la balise boardContainer
    // this.boardContainer.prepend(htmlBoardCoord);
    document.getElementById('boardContainer').innerHTML += htmlBoardCoord;


    // Ajout des coordonnées sur le bas et haut du plateau
    let htmlBoardCoordH = '<div class="board-coord-bar horizontal">';

    for (let i = 0; i < 12; i++) {
      htmlBoardCoordH += '<div class="board-coord">' + this.columns[i] + '</div>';
    }
    htmlBoardCoordH += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    // this.boardGame.prepend(htmlBoardCoordH);
    document.getElementById('boardGame').innerHTML += htmlBoardCoordH;
  }


}
