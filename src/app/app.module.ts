import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilViewComponent } from './accueil-view/accueil-view.component';
import { ServeurService } from './services/serveur.service';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { WaitGameComponent } from './wait-game/wait-game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PartyWinComponent } from './party-win/party-win.component';
import { PartyLooseComponent } from './party-loose/party-loose.component';

const appRoutes: Routes = [
  {path: '', component: AccueilViewComponent},
  {path: 'waitGame/:idPartie/:idJoueur', component: WaitGameComponent},
  {path: 'gameBoard/:idPartie/:idJoueur', component: GameBoardComponent},
  {path: 'win', component: PartyWinComponent},
  {path: 'loose', component: PartyLooseComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilViewComponent,
    WaitGameComponent,
    GameBoardComponent,
    PartyWinComponent,
    PartyLooseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ServeurService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
