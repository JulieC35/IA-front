import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilViewComponent } from './accueil-view/accueil-view.component';
import { ServeurService } from './services/serveur.service';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { WaitGameComponent } from './wait-game/wait-game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PartyWinComponent } from './party-win/party-win.component';
import { PartyLooseComponent } from './party-loose/party-loose.component';
import { RulesViewComponent } from './rules-view/rules-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilViewComponent,
    WaitGameComponent,
    GameBoardComponent,
    PartyWinComponent,
    PartyLooseComponent,
    RulesViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ServeurService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
