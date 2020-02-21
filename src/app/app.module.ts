import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilViewComponent } from './accueil-view/accueil-view.component';
import { ServeurService } from './services/serveur.service';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { WaitGameComponent } from './wait-game/wait-game.component';
const appRoutes: Routes = [
  {path: '', component: AccueilViewComponent},
  {path: 'waitGame', component: WaitGameComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilViewComponent,
    WaitGameComponent
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
