import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServeurService} from '../services/serveur.service';

@Component({
  selector: 'app-party-loose',
  templateUrl: './party-loose.component.html',
  styleUrls: ['./party-loose.component.css']
})
export class PartyLooseComponent implements OnInit {

  constructor(private serveurService: ServeurService, private router: Router) { }

  ngOnInit(): void {
  }

  accueil() {
    this.serveurService.close();
    this.router.navigate(['home']);
  }

}
