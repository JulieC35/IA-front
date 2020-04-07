import { Component, OnInit } from '@angular/core';
import { ServeurService } from '../services/serveur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules-view',
  templateUrl: './rules-view.component.html',
  styleUrls: ['./rules-view.component.css']
})

export class RulesViewComponent implements OnInit {

  constructor(private serveurService: ServeurService, private router: Router) { }

  ngOnInit(): void { }

}
