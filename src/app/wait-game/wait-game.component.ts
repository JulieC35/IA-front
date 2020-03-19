import {Component, Input, OnInit} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import {ActivatedRoute, Router} from '@angular/router';

type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
type PromiseReject = (error?: any) => void;

@Component({
  selector: 'app-wait-game',
  templateUrl: './wait-game.component.html',
  styleUrls: ['./wait-game.component.css']
})
export class WaitGameComponent implements OnInit {

  @Input() id: number;

  constructor(private serveurService: ServeurService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.idPartie;
    this.getMovePromise().then(
      data => this.router.navigate(['gameBoard/' + this.id + '/J1']));
  }

  getMovePromise() {
    return new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      this.serveurService.socket.onmessage = (event) => {
        switch (event.data) {
          case'$AWAITING':
            break;
          case '$START':
            resolve(event.data);
            break;
          default:
            reject(event.data);
        }
      };
    });
  }

}
