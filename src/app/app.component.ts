import { Component } from '@angular/core';
import {ServeurService} from './services/serveur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Onyx Board Game';

  constructor(private serveurService: ServeurService) {

  }

}
