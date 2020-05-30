import { PlayerModule } from './player/player.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LobbyModule } from './lobby/lobby.module';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    GameComponent,
    MainmenuComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    CoreModule,
    PlayerModule,
    ApolloModule,
    HttpLinkModule,
    LobbyModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: environment.backendUrl }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
