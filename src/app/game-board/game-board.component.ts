import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
  firstWaitAIIsDone = false;
  gameFinished = false;

  constructor(private serveurService: ServeurService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.board = new GameBoard(5);
    this.board.generateBoardGame();
    this.addListener();
    if (!this.serveurService.url.split('/')[4].includes('ia')) {
      this.firstWaitAIIsDone = true;
    }
    this.yourTurn = (this.route.snapshot.params.idJoueur === 'J1');
    this.getServeurMessagePromise().then(
      data => this.router.navigate(['/' + data]));
  }

  accueil() {
    this.serveurService.close();
    this.router.navigate(['']);
  }

  getServeurMessagePromise() {
    return new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      this.serveurService.socket.onmessage = (event) => {
        const joueur = document.URL.split('gameBoard/')[1].split('/')[1];
        const datas = event.data;
        console.log(datas);
        const command = datas.substr(0, 1);
        switch (command) {
          // case $ : command
          case '$':
            const message = datas.slice(1);
            switch (message) {
              case 'AWAITING':
                document.getElementById('message').innerText = '';
                break;
              case 'START':
                if (!this.firstWaitAIIsDone) {
                  this.firstWaitAIIsDone = true;
                }
                document.getElementById('message').innerText = 'Début de la partie !';
                break;
              case 'READY':
                this.yourTurn = true;
                document.getElementById('message').innerText = '';
                break;
              case 'WIN':
                document.getElementById('message').innerText = 'Vous avez gagné !';
                this.gameFinished = true;
                // resolve('win');
                break;
              case 'LOOSE':
                document.getElementById('message').innerText = 'Vous avez perdu !';
                this.gameFinished = true;
                // resolve('loose');
                break;
              case 'END':
                console.log('Partie terminée !');
                break;
            }
            break;
          case '#':
            if (datas.slice(1).indexOf('OPPONENT') !== -1) {
              const coord = datas.split(' ')[1];
              console.log('opponent: ' + coord);
              let classname = 'active';
              document.getElementById(coord).classList.add('active');
              if (joueur === 'J1') {
                classname += ' color1';
                document.getElementById(coord).classList.add('color1');
              } else {
                classname += ' color2';
                document.getElementById(coord).classList.add('color2');
              }
            }
            break;
          case '=':
            const captures = datas.slice(1).split(' ');
            console.log(captures);
            if (captures[0] !== '') {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < captures.length - 1; i++) {
                document.getElementById(captures[i]).classList.remove('active');
                document.getElementById(captures[i]).classList.remove('color2');
                document.getElementById(captures[i]).classList.remove('color1');
                this.getStoneClickPromise(document.getElementById(captures[i]));
              }
            }
            console.log('capturés: ' + captures);
            break;
          case '!':
            if (datas.slice(1).indexOf('Position not allowed') !== -1) {
              const coord = datas.slice(1).split(':')[1];
              console.log(datas.slice(1));
              document.getElementById(coord).classList.remove('active');
              if (joueur === 'J1') {
                document.getElementById(coord).classList.remove('color2');
              } else {
                document.getElementById(coord).classList.remove('color1');
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
      this.getStoneClickPromise(stones[i]);
    }
  }

  getStoneClickPromise(stone) {
    new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      stone.onclick = (event) => {
        console.log(event.target.getAttribute('class'));
        if (!event.target.getAttribute('class').includes('active')) {
          let classname;
          // tslint:disable-next-line:triple-equals
          const joueur = document.URL.split('gameBoard/')[1].split('/')[1];
          if (joueur == 'J1') {
            classname = 'active color2';
          } else {
            classname = 'active color1';
          }
          const data = [classname, event.target, event.target.id];
          resolve(data);
        } else {
          const data = ['Pierre déjà placée !', event.target, event.target.id];
          reject(data);
        }
      };
    }).then(
      data => {
        const classname = data[0];
        const target = data[1];
        const coord = data[2];
        if (this.yourTurn && this.firstWaitAIIsDone) {
          console.log(coord);
          this.serveurService.sendMessage(coord);
          $(target).addClass(classname);
          this.yourTurn = !this.yourTurn;
        } else {
          console.log('Ce n\'est pas ton tour !');
          document.getElementById('message').innerText = 'Ce n\'est pas ton tour.';
          this.getStoneClickPromise(document.getElementById(coord));
        }
      })
      .catch(
        data => {
          const message = data[0];
          const coord = data[2];
          if (this.yourTurn) {
            document.getElementById('message').innerText = message;
            this.getStoneClickPromise(document.getElementById(coord));
          } else {
            document.getElementById('message').innerText = 'Ce n\'est pas ton tour.';
            this.getStoneClickPromise(document.getElementById(coord));
          }
        }
      );
  }

  stoneClick(event: any) {
    console.log('stone click');
    if (!event.target.getAttribute('class').includes('active')) {
      const coord = event.target.id;
      const idJquery = '#' + coord;
      console.log(idJquery);
      $(event.target).addClass('active');
      const player = Math.round((Math.random()) + 1);
      $(event.target).addClass('color' + player);
      console.log(event.target);
      console.log(coord);
    }
  }

}
