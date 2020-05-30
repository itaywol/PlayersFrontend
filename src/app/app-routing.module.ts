import { LobbyComponent } from './lobby/container/lobby.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';

const routes: Routes = [
  { path: 'main-menu', component: MainmenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
