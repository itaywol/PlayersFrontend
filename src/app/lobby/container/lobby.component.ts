import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/interfaces/player.model';
import { Store } from '@ngrx/store';
import { getCurrentPlayer, getLobbyPlayers } from '../../core/core.reducer';
import { Observable } from 'rxjs';
import { GetPlayers } from '../lobby.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  currentPlayer$:Observable<Player> = this.store.select(getCurrentPlayer)
  lobbyPlayers$:Observable<Player[]> = this.store.select(getLobbyPlayers);
  currentPlayer:Player;
  lobbyPlayers:Player[] = [];
  constructor(private store:Store<any>,private router:Router) { }

  ngOnInit(): void {
    
    this.store.dispatch(new GetPlayers());

    this.currentPlayer$.subscribe((player:Player) => {
      this.currentPlayer = player
    },error=>this.router.navigate(["/main-menu"]))
    this.lobbyPlayers$.subscribe((players:Player[]) => {
      this.lobbyPlayers = players
    })
    if(!this.currentPlayer) this.router.navigate(["/main-menu"])
  }

}
