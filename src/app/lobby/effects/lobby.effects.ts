import { PlayerUpdated, ListenToPlayerUpdates } from './../lobby.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, throwError } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { GetPlayers, LobbyScreenActions, GotPlayers } from '../lobby.actions';
import { switchMap, map, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { LobbyService } from '../lobby.service';
import { ApolloQueryResult } from 'apollo-client';
import { Player } from 'src/app/player/interfaces/player.model';
import { Router } from '@angular/router';
import { getCurrentPlayer } from 'src/app/core/core.reducer';

@Injectable()
export class LobbyScreenEffects {
  constructor(
    private actions$: Actions,
    private lobbyService: LobbyService,
    private store: Store<any>,
    private router: Router
  ) {}
  @Effect()
  getPlayers$: Observable<Action> = this.actions$.pipe(
    ofType<GetPlayers>(LobbyScreenActions.GetPlayers),
    switchMap(() => {
      return this.lobbyService.getPlayers();
    }),
    withLatestFrom(this.store.select(getCurrentPlayer)),
    map(([result, currentPlayer]) => {
      if (result.errors) return throwError(new Error('Failed to fetch lobby players'));
      if (!currentPlayer)
        return throwError(
          new Error('Couldnt fetch lobby players as not loggedin player')
        );
      return new GotPlayers(
        result.data.getPlayers.filter(
          (player: Player) =>
            player.playerNickname !== currentPlayer.playerNickname
        )
      );
    })
  );

  @Effect()
  listenPlayerUpdates$: Observable<Action> = this.actions$.pipe(
    ofType<ListenToPlayerUpdates>(LobbyScreenActions.listenToPlayerUpdates),
    switchMap(() => {
      return this.lobbyService.listenToPlayerUpdates();
    }),
    map((subscriptionResult) => {
      return new PlayerUpdated(subscriptionResult.data.playerUpdated);
    })
  );
}
