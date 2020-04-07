import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServeurService} from '../services/serveur.service';

@Component({
  selector: 'app-party-win',
  templateUrl: './party-win.component.html',
  styleUrls: ['./party-win.component.css']
})
export class PartyWinComponent implements OnInit {

  constructor(private serveurService: ServeurService, private router: Router) { }

  ngOnInit(): void {
  }

  accueil() {
    this.serveurService.close();
    this.router.navigate(['home']);
  }

}
