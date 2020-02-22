import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() boardGame;
  @Input() boardContainer;

  columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  rows = ['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

  constructor() { }

  ngOnInit(): void {

    this.createColums();
    this.createLines();

  }

  createColums() {
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
    this.boardGame.append(htmlColumnLayer);
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
    this.boardGame.append(htmlRowLayer);
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
    this.boardGame.append(htmlDiamondCenterLayer);
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
    this.boardGame.append(htmlSquareCenterLayer);
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
    this.boardGame.append(htmlSquareColorLayer);
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
          + this.rows[indexRows] + '-' + this.rows[indexRows + 1];
        htmlStoneLayer += '<div class="boardGame-stone" id="' + id + '"></div>';
        indexColumns += 2;
      }
      htmlStoneLayer += '</div>';

      indexRows++;

      // Ligne sans offset
      htmlStoneLayer += '<div class="boardGame-stones-row offset">';
      for (let j = 0; j < 12; j++) {
        const id = this.columns[j] + ',' + this.rows[indexRows];
        htmlStoneLayer += '<div class="boardGame-stone" id="' + id + '"></div>';
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
    this.boardGame.append(htmlStoneLayer);
  }

  addCoord() {
    // Ajout des coordonnées sur le côté du plateau
    let htmlBoardCoord = '<div class="board-coord-bar">';
    for (let i = 0; i < 12; i++) {
      htmlBoardCoord += '<div class="board-coord">' + this.rows[i] + '</div>';
    }
    htmlBoardCoord += '</div>';

    // Ajout du code à l'intérieur de la balise boardContainer
    this.boardContainer.prepend(htmlBoardCoord);
    this.boardContainer.append(htmlBoardCoord);


    // Ajout des coordonnées sur le bas et haut du plateau
    let htmlBoardCoordH = '<div class="board-coord-bar horizontal">';

    for (let i = 0; i < 12; i++) {
      htmlBoardCoordH += '<div class="board-coord">' + this.columns[i] + '</div>';
    }
    htmlBoardCoordH += '</div>';

    // Ajout du code à l'intérieur de la balise boardGame
    this.boardGame.prepend(htmlBoardCoordH);
    this.boardGame.append(htmlBoardCoordH);
  }

}