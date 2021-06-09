import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavVarComponent } from './nav-var/nav-var.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    OrderPipe,
    HomePageComponent,
    GameDetailsComponent,
    RegisterComponent,
    LoginComponent,
    NavVarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomePageComponent
      },
      {
        path: "games",
        component: GamesListComponent
      }
      ,
      {
        path: "game/:gameId",
        component: GameDetailsComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      }
    ])
  ],
  providers: [],
  //bootstrap: [GamesListComponent]
  bootstrap: [AppComponent]
})
export class AppModule { }
