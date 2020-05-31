
import { Action } from '@ngrx/store';
import { Player } from '../player/interfaces/player.model';

export enum LobbyScreenActions {
    GetPlayers = "lobbyScreen:getPlayers",
    GotPlayers = "lobbyScreen:gotPlayers",
    listenToPlayerUpdates = "lobbyScreen:listenPlayerUpdates",
    PlayerUpdated = "lobbyScreen:playerUpdated"
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

export class ListenToPlayerUpdates implements Action {
    type = LobbyScreenActions.listenToPlayerUpdates;

    constructor() {}
}

export class PlayerUpdated implements Action {
    type = LobbyScreenActions.PlayerUpdated;

    constructor(public player:Player) {
    }
}