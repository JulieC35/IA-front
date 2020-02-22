import {Component, Input, OnInit} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accueil-view',
  templateUrl: './accueil-view.component.html',
  styleUrls: ['./accueil-view.component.css']
})
export class AccueilViewComponent implements OnInit {

  @Input() idPartie: number;
  private id: number;
  private url = 'ws://localhost:8989/room/';

  constructor(private serveurService: ServeurService, private router: Router) {
  }

  ngOnInit(): void {
  }


  human() {
    this.id = this.randomIntFromInterval(1000, 9999);
    const urlH = this.url + this.id;
    this.serveurService = this.serveurService.init(urlH);
    console.log(this.serveurService.socket);
    this.router.navigate(['waitGame/' + this.id]);
  }

  getPartie() {
    const urlR = this.url + this.idPartie;
    console.log(urlR);
    this.serveurService = this.serveurService.init(urlR);
    console.log(this.serveurService.socket);
  }

  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
