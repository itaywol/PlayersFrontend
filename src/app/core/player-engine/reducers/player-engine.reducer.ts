import { Action } from '@ngrx/store';
import { LoginSuccess } from '../../../feature/login-screen/login-screen.actions';
import {
  loginScreenActionsTypes,
  ExecuteLogin,
} from '../../../feature/login-screen/login-screen.actions';
export const corePlayerEngineToken = 'playersCore';

export interface PlayerState {
  playerNickName: string | undefined;
  playerToken: string | undefined;
}

export const PlayerInitialState: PlayerState = {
  playerNickName: undefined,
  playerToken: undefined,
};

export const PlayerCoreReducer = (
  state: PlayerState = PlayerInitialState,
  action: Action
): PlayerState => {
  switch (action.type) {
    case loginScreenActionsTypes.EXEC_LOGIN: {
      return {
        ...state,
        playerNickName: (action as ExecuteLogin).playerNickName,
      };
    }
    case loginScreenActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        playerToken: (action as LoginSuccess).playerToken,
      };
    }
  }

  return state;
};
