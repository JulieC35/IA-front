import {Component, Input, OnInit} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wait-game',
  templateUrl: './wait-game.component.html',
  styleUrls: ['./wait-game.component.css']
})
export class WaitGameComponent implements OnInit {

  @Input() id: number;

  constructor(private serveurService: ServeurService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idPartie'];
  }

}
