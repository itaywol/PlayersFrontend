import { LobbyScreenActions, GotPlayers, PlayerUpdated } from './../lobby/lobby.actions';
import {
  PlayerActions,
  LoginAction,
  LoginSuccess,
} from './../player/player.actions';
import { CoreState, coreReducer } from './core.reducer';
import { Player } from '../player/interfaces/player.model';

describe('CoreReducer', () => {
  it('should execute login action', () => {
    const expectedState: CoreState = {
      currentPlayer: new Player('itay', 'sometoken', false),
      players: [],
    };

    const resultState = coreReducer(undefined, {
      type: PlayerActions.LOGIN_SUCCESS,
      playerResponse: {
        playerNickname: 'itay',
        authToken: 'sometoken',
        ready: false,
      },
    } as LoginSuccess);

    expect(resultState.currentPlayer).toEqual(expectedState.currentPlayer);
  });

  it('should login as new player', () => {
    const oldState: CoreState = {
      currentPlayer: new Player('itay', 'token', false),
      players: [],
    };

    const expectedState: CoreState = {
      currentPlayer: new Player('testingIsFun', 'nekot', false),
      players: [],
    };

    const resultState = coreReducer(oldState, {
      type: PlayerActions.LOGIN_SUCCESS,
      playerResponse: new Player('testingIsFun', 'nekot', false),
    } as LoginSuccess);

    expect(resultState.currentPlayer).toEqual(expectedState.currentPlayer);
  });

  it('should set lobby players state', () => {
    const oldState: CoreState = {
      currentPlayer: new Player('itay', 'token', false),
      players: [],
    };
    const expectedState: CoreState = {
      currentPlayer: new Player('testingIsFun', 'nekot', false),
      players: [
        new Player('one', 'two', false),
        new Player('three', 'i can count', false),
      ],
    };

    const resultState = coreReducer(oldState, {
      type: LobbyScreenActions.GotPlayers,
      players: [
        new Player('one', 'two', false),
        new Player('three', 'i can count', false),
      ],
    } as GotPlayers);
    expect(resultState.players).toEqual(expectedState.players)
  });

  it("should update player state on ready",()=> {
    const oldState: CoreState = {
      currentPlayer: new Player('itay', 'token', false),
      players: [new Player("other","not ready",false)],
    };
    const expectedState: CoreState = {
      currentPlayer: new Player('itay', 'token', false),
      players: [
        new Player('other', 'not ready', true),
      ],
    };

    const resultState = coreReducer(oldState, {
      type: LobbyScreenActions.PlayerUpdated,
      player: new Player("other","not ready",true)
    } as PlayerUpdated);
    
    expect(resultState.players).toEqual(expectedState.players)
  })
});
