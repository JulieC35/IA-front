import { Component } from '@angular/core';
import {ServeurService} from './services/serveur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Onyx Board Game';
  id: number;

  constructor(private serveurService: ServeurService) {
    this.id = this.randomIntFromInterval(1000, 9999);
    const url = 'ws://localhost:8989/room/' + this.id;
    serveurService = serveurService.init(url);
    console.log(serveurService.socket);
  }

  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
