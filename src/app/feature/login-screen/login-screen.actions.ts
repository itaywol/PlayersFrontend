import { Action } from '@ngrx/store';

export enum loginScreenActionsTypes {
  EXEC_LOGIN = 'loginScreen:execLogin',
  LOGIN_SUCCESS = 'loginScreen:loginSuccess',
}

export class ExecuteLogin implements Action {
  type = loginScreenActionsTypes.EXEC_LOGIN;

  constructor(public playerNickName: string) {}
}

export class LoginSuccess implements Action {
  type = loginScreenActionsTypes.LOGIN_SUCCESS;

  constructor(public playerToken: string) {}
}
