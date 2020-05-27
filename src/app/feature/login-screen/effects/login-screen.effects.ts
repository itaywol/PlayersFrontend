import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  ExecuteLogin,
  loginScreenActionsTypes,
  LoginSuccess,
} from '../login-screen.actions';
import { registerMutation } from 'src/app/graphql/mutations/login.gql';
import { GraphQLRequest, FetchResult } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { QueryOptions, MutationOptions } from 'apollo-client';

@Injectable()
export class LoginScreenEffects {

  @Effect()
  executeLogin$: Observable<Action> = this.actions$.pipe(
    ofType<ExecuteLogin>(loginScreenActionsTypes.EXEC_LOGIN),
    switchMap((action:ExecuteLogin) => {
      const registerOperation:MutationOptions = {
        mutation:registerMutation,
        variables: {
          data: {
            nickName: action.playerNickName
          }
        }
      }
      return this.apollo.mutate(registerOperation)
    }),
    map((result:FetchResult<any>) => {
      return new LoginSuccess(result.data.registerPlayer.authToken);
    })
  );

  /**
   *
   */
  constructor(public actions$: Actions,private apollo:Apollo) {}
}
