import { PlayerService } from './../player.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect,ofType } from '@ngrx/effects';
import { PlayerActions, LoginAction, LoginSuccess, HitReady, AckReady } from '../player.actions';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { PlayerDTO } from '../interfaces/player.interface';
import { FetchResult } from 'apollo-link';
import { Router } from '@angular/router';
import { Player } from '../interfaces/player.model';



@Injectable()
export class PlayerEffects {

    @Effect()
    loginAction$: Observable<Action> = this.actions$.pipe(ofType<LoginAction>(PlayerActions.REQUEST_LOGIN),
    switchMap((action:LoginAction)=> this.playerService.registerPlayer(action.selectedNickname)),
    map((result:FetchResult<any>) => {
        return new LoginSuccess(result.data.registerPlayer as PlayerDTO)
    }));

    @Effect({dispatch:false})
    loginSuccess: Observable<Action> = this.actions$.pipe(ofType<LoginSuccess>(PlayerActions.LOGIN_SUCCESS),tap(()=>{
        this.router.navigate(["/lobby"])
    }))

    @Effect()
    becomeReady$: Observable<Action> = this.actions$.pipe(ofType<HitReady>(PlayerActions.HIT_READY),switchMap((value:HitReady) => {
        return this.playerService.updatePlayer(value.player.token,true);
    }),map((value) => {
        return new AckReady(value.data.updatePlayer as Player)
    }))


    constructor(private actions$:Actions,private apollo:Apollo,private playerService:PlayerService,private router:Router) {}

}