import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { GetPlayers, LobbyScreenActions, GotPlayers } from '../lobby.actions';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { LobbyService } from '../lobby.service';
import { ApolloQueryResult } from 'apollo-client';
import { Player } from 'src/app/player/interfaces/player.model';
import { Router } from '@angular/router';
import { getCurrentPlayer } from 'src/app/core/core.reducer';

@Injectable()
export class LobbyScreenEffects {

    constructor(private actions$:Actions,private lobbyService:LobbyService,private store:Store<any>) {
        
    }
    @Effect()
    getPlayers$: Observable<Action> = this.actions$.pipe(ofType<GetPlayers>(LobbyScreenActions.GetPlayers),
    switchMap(()=>{
        return this.lobbyService.getPlayers();

    }),withLatestFrom(this.store.select(getCurrentPlayer)),map(([result,currentPlayer]) => {
        if(result.errors) throw new Error("Couldnt receive lobby players")
        return new GotPlayers(result.data.getPlayers.filter((player:Player)=>player.playerNickname!==currentPlayer.playerNickname));
    }))

}