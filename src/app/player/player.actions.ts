import { Action } from '@ngrx/store';
import {PlayerDTO} from "./interfaces/player.interface"

export enum PlayerActions {
    REQUEST_LOGIN = "playerActions:requestLogin",
    LOGIN_SUCCESS = "playerActions:loginSuccess",
    HIT_READY = "playerActions:hitReady",
    ACK_READY = "playerActions:acknowledgedReady"
}
export class LoginAction implements Action {
    type = PlayerActions.REQUEST_LOGIN;

    constructor(public selectedNickname:string) {}
}

export class LoginSuccess implements Action {
    type = PlayerActions.LOGIN_SUCCESS;

    constructor(public playerResponse:PlayerDTO) {}
}