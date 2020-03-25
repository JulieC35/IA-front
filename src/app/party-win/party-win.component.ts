import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-party-win',
  templateUrl: './party-win.component.html',
  styleUrls: ['./party-win.component.css']
})
export class PartyWinComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  accueil() {
    this.router.navigate(['']);
  }

}
