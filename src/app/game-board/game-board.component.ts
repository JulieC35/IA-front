import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from '@angular/router';
type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
type PromiseReject = (error?: any) => void;
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
  @Input() message: string;
  board;

  yourTurn: boolean;
  endOfGame = false;

  constructor(private serveurService: ServeurService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.board = new GameBoard(5);
    this.board.generateBoardGame();
    this.addListener();
    // tslint:disable-next-line:triple-equals
    this.yourTurn = (this.route.snapshot.params.idJoueur == 'J1');
    this.getServeurMessagePromise().then(
      data => this.router.navigate(['/' + data]));
  }

  getServeurMessagePromise() {
    return new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      this.serveurService.socket.onmessage = (event) => {
        const joueur = document.URL.split('gameBoard/')[1].split('/')[1];
        const datas = event.data;
        const command = datas.substr(0, 1);
        switch (command) {
          // case $ : command
          case '$':
            const message = datas.slice(1);
            switch (message) {
              case 'AWAITING':
                document.getElementById('message').innerText = '';
                this.yourTurn = false;
                break;
              case 'START':
                console.log('Début de la partie !');
                document.getElementById('message').innerText = 'Début de la partie !';
                break;
              case 'READY':
                this.yourTurn = true;
                document.getElementById('message').innerText = '';
                break;
              case 'WIN':
                console.log('Vous avez gagné !');
                resolve('win');
                break;
              case 'LOOSE':
                console.log('LOOOOOSER !');
                resolve('loose');
                break;
              case 'END':
                console.log('Partie terminée !');
                break;
            }
            break;
          case '#':
            if (datas.slice(1).indexOf('OPPONENT') != -1) {
              const coord = datas.split(' ')[1];
              console.log('opponent: ' + coord);
              let classname = 'active';
              document.getElementById(coord).classList.add('active');
              // tslint:disable-next-line:triple-equals
              if (joueur == 'J1') {
                classname += ' white';
                document.getElementById(coord).classList.add('white');
              } else {
                classname += ' black';
                document.getElementById(coord).classList.add('black');
              }
            }
            break;
          case '=':
            const captures = datas.slice(1).split(' ');
            console.log(captures);
            if (captures[0] != '') {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < captures.length - 1; i++) {
                document.getElementById(captures[i]).classList.remove('active');
                if (joueur == 'J1') {
                  document.getElementById(captures[i]).classList.remove('black');
                } else {
                  document.getElementById(captures[i]).classList.remove('white');
                }
                this.getStoneClickPromise(document.getElementById(captures[i]));
              }
            }
            console.log('capturés: ' + captures);
            break;
          case '!':
            if (datas.slice(1).indexOf('Position not allowed') != -1) {
              const coord = datas.slice(1).split(':')[1];
              console.log(datas.slice(1));
              document.getElementById(coord).classList.remove('active');
              if (joueur == 'J1') {
                document.getElementById(coord).classList.remove('black');
              } else {
                document.getElementById(coord).classList.remove('white');
              }
              this.yourTurn = true;
            }
            console.log(datas.slice(1));
            document.getElementById('message').innerText = datas.slice(1);
            // document.getElementById(coord).classList.remove('active');
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
      this.getStoneClickPromise(stones[i]); /* .then(
        data => {
          console.log('passage: ' + data);
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
        });*/
    }
  }

  getStoneClickPromise(stone) {
    new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      stone.onclick = (event) => {
        console.log(event);
        if (!event.target.getAttribute('class').includes('active')) {
          let classname;
          // tslint:disable-next-line:triple-equals
          if (document.URL.split('gameBoard/')[1].split('/')[1] == 'J1') {
            classname = 'active black';
          } else {
            classname = 'active white';
          }
          const data = [classname, event.target, event.target.id];
          console.log('Passage au bon endroit');
          resolve(data);
        } else {
          reject('Pierre déjà placée !');
        }
      };
    }).then(
      data => {
        console.log('passage: ' + data);
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
