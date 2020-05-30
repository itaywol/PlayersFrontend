import { Action } from '@ngrx/store';
import { Player } from '../player/interfaces/player.model';

export enum LobbyScreenActions {
    GetPlayers = "lobbyScreen:getPlayers",
    GotPlayers = "lobbyScreen:gotPlayers"
}

export class GetPlayers implements Action {
    type = LobbyScreenActions.GetPlayers;

    /**
     *
     */
    constructor() {
    }
}

export class GotPlayers implements Action {
    type = LobbyScreenActions.GotPlayers;

    constructor(public players:Player[]) {}
}