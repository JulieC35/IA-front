import {Component, Input, OnInit} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
type PromiseResolve<T> = (value?: T | PromiseLike<T>) => void;
type PromiseReject = (error?: any) => void;

@Component({
  selector: 'app-accueil-view',
  templateUrl: './accueil-view.component.html',
  styleUrls: ['./accueil-view.component.css']
})
export class AccueilViewComponent implements OnInit {

  @Input() idPartie: number;
  private id: number;
  private url = environment.gameServerUrl;

  constructor(private serveurService: ServeurService, private router: Router) {
  }

  ngOnInit(): void {
  }


  human() {
    this.id = this.randomIntFromInterval(100000, 999999);
    const urlH = this.url + this.id;
    this.serveurService = this.serveurService.init(urlH);
    this.getMovePromise().then(
      data => this.router.navigate(['waitGame/' + this.id + '/J1']));
  }

  ia() {
    this.id = this.randomIntFromInterval(100000, 999999);
    const urlH = this.url + 'ia' + this.id;
    console.log(urlH);
    this.serveurService = this.serveurService.init(urlH);
    this.getMovePromise().then(
      data => this.router.navigate(['gameBoard/ia' + this.id + '/J1']));
  }

  getMovePromise() {
    return new Promise((resolve: PromiseResolve<any>, reject: PromiseReject): void => {
      // tslint:disable-next-line:only-arrow-functions
      this.serveurService.socket.onmessage = (event) => {
        // tslint:disable-next-line:triple-equals
        if (event.data == '#Room created' || event.data == '#Room joined') {
          resolve(event.data);
        } else {
          reject(event.data);
        }
      };
    });
  }

  getPartie() {
    const urlR = this.url + this.idPartie;
    console.log(urlR);
    this.serveurService = this.serveurService.init(urlR);
    console.log(this.serveurService.socket);
    this.getMovePromise().then(
      data => this.router.navigate(['gameBoard/' + this.idPartie + '/J2']));
  }

  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  regle() {
    this.router.navigate(['rules']);
  }

}
