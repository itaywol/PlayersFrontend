import { PlayerUpdated } from './../lobby/lobby.actions';
import { Player } from '../player/interfaces/player.model'
import {Action, createSelector, createFeatureSelector} from "@ngrx/store"
import { PlayerActions, LoginSuccess, AckReady } from '../player/player.actions';
import { PlayerDTO } from '../player/interfaces/player.interface';
import { LobbyScreenActions, GotPlayers } from '../lobby/lobby.actions';


export const coreStoreToken = "coreStoreToken"

export interface CoreState {
  currentPlayer:Player | undefined;
  players: Player[] | undefined;
}

export const coreReducer = (state:CoreState = {players:undefined,currentPlayer:undefined},action:Action):CoreState => {
  switch(action.type) {
    case PlayerActions.LOGIN_SUCCESS: {
      const playerDto:PlayerDTO = (action as LoginSuccess).playerResponse 
      const newPlayer:Player = new Player(playerDto.playerNickname,playerDto.authToken,playerDto.ready);
      return {...state,currentPlayer:newPlayer}
    }
    case LobbyScreenActions.GotPlayers: {
      return {...state,players:(action as GotPlayers).players}
    }
    case PlayerActions.ACK_READY: {
      return {...state,currentPlayer:(action as AckReady).player}
    }
    case LobbyScreenActions.PlayerUpdated: {
      const updatedPlayer:Player = (action as PlayerUpdated).player
      const currentState = Object.assign({},state);
      const findIndex:number = currentState.players.findIndex((value:Player)=>value.playerNickname===updatedPlayer.playerNickname)
      console.log(findIndex)
      if(currentState.currentPlayer.playerNickname === updatedPlayer.playerNickname) return state;

      if(findIndex===-1)
      {
        const newArray:Player[] = [...currentState.players]
        newArray.push(updatedPlayer)
        return {...currentState,players:newArray}
      } else {
        const newArray:Player[] = [...currentState.players]

        newArray[findIndex]=updatedPlayer

        return {...currentState,players:newArray}
      }
    }
  }
  return state
}

export const getCoreState = createFeatureSelector(coreStoreToken);
export const getCurrentPlayer = createSelector(getCoreState,(state:CoreState)=>state.currentPlayer)
export const getLobbyPlayers = createSelector(getCoreState,(state:CoreState) => state.players)
