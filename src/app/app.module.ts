import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilViewComponent } from './accueil-view/accueil-view.component';
import { ServeurService } from './services/serveur.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ServeurService
  ],
  bootstrap: [
    AppComponent,
    AccueilViewComponent
  ]
})
export class AppModule { }
