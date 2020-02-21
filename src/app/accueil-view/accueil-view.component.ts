import { Component, OnInit } from '@angular/core';
import {ServeurService} from '../services/serveur.service';

@Component({
  selector: 'app-accueil-view',
  templateUrl: './accueil-view.component.html',
  styleUrls: ['./accueil-view.component.css']
})
export class AccueilViewComponent implements OnInit {

  private id: number;

  constructor(private serveurService: ServeurService) {
  }

  ngOnInit(): void {
  }


  human() {
    console.log(this.serveurService.socket);
  }

  getPartie() {
    console.log(this.serveurService.socket);
  }

}
