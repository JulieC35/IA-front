import {Component, Input, OnInit} from '@angular/core';
import {ServeurService} from '../services/serveur.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wait-game',
  templateUrl: './wait-game.component.html',
  styleUrls: ['./wait-game.component.css']
})
export class WaitGameComponent implements OnInit {

  @Input() id: number;

  constructor(private serveurService: ServeurService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.idPartie;
    this.serveurService.socket.onmessage = this.moveBoard;
  }

  moveBoard(event: any) {
    // tslint:disable-next-line:triple-equals
    if(event.data == '$READY') {
      this.router.navigate(['gameBoard/' + this.id]);
    }
  }

}
