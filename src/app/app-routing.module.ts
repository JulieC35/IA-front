import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilViewComponent} from "./accueil-view/accueil-view.component";
import {WaitGameComponent} from "./wait-game/wait-game.component";
import {GameBoardComponent} from "./game-board/game-board.component";
import {PartyWinComponent} from "./party-win/party-win.component";
import {PartyLooseComponent} from "./party-loose/party-loose.component";
import {RulesViewComponent} from "./rules-view/rules-view.component";


const routes: Routes = [
  {path: '', component: AccueilViewComponent},
  {path: 'waitGame/:idPartie/:idJoueur', component: WaitGameComponent},
  {path: 'gameBoard/:idPartie/:idJoueur', component: GameBoardComponent},
  {path: 'win', component: PartyWinComponent},
  {path: 'loose', component: PartyLooseComponent},
  {path: 'rules', component: RulesViewComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
