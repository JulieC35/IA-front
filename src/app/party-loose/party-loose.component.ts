import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-party-loose',
  templateUrl: './party-loose.component.html',
  styleUrls: ['./party-loose.component.css']
})
export class PartyLooseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  accueil() {
    this.router.navigate(['']);
  }

}
