import { getTimerState } from './../../core/core.reducer';
import { ListenToPlayerUpdates } from './../lobby.actions';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/interfaces/player.model';
import { Store } from '@ngrx/store';
import { getCurrentPlayer, getLobbyPlayers } from '../../core/core.reducer';
import { Observable, interval } from 'rxjs';
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
  lobbyTimerState$:Observable<Boolean> = this.store.select(getTimerState);
  timer:number = 5;

  constructor(private store:Store<any>,private router:Router) { }

  ngOnInit(): void {
    
    this.store.dispatch(new GetPlayers());
    this.store.dispatch(new ListenToPlayerUpdates());

    this.currentPlayer$.subscribe((player:Player) => {
      if(!player) this.router.navigate(["/main-menu"])
    },error=>this.router.navigate(["/main-menu"]))
    this.lobbyPlayers$.subscribe((players:Player[]) => {
    })

    this.lobbyTimerState$.subscribe(state => {
      if(state) {
        interval(1000).subscribe(x => {
          this.timer=this.timer-1
          if(this.timer===0)
          {
            this.router.navigate(["/game"])
          }
        })
      }
    })
  }

}
