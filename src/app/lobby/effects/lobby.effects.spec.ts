import { RouterModule } from '@angular/router';
import { GotPlayers, LobbyScreenActions } from './../lobby.actions';
import { Player } from 'src/app/player/interfaces/player.model';
import { registerPlayer } from './../../shared/graphql/player/player.gql';
import { LobbyService } from './../lobby.service';
import { StoreModule } from '@ngrx/store';
import { TestBed, inject } from '@angular/core/testing';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { Actions, EffectsModule } from '@ngrx/effects';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';
import { LobbyScreenEffects } from './lobby.effects';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, FetchResult } from 'apollo-link';
import { getOperationDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { environment } from 'src/environments/environment';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { hot, getTestScheduler } from 'jasmine-marbles';

describe('LoginScreenEffects', () => {
  let actions$: TestHotObservable;
  let lobbyService: LobbyService;
  let lobbyScreenEffects: LobbyScreenEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        EffectsModule.forFeature([LobbyScreenEffects]),
      ],
      providers: [
        LobbyScreenEffects,
        LobbyService,
        {
          provide: LobbyService,
          useValue: jasmine.createSpyObj('LobbyService', [
            'getPlayers',
            'listenToPlayerUpdates',
          ]),
        },
        provideMockActions(() => actions$),
      ],
    });
  });

  beforeEach(() => {
    lobbyService = TestBed.inject(LobbyService);
    lobbyScreenEffects = TestBed.inject(LobbyScreenEffects);
  });

  it('should be created', inject(
    [LobbyScreenEffects],
    (service: LobbyScreenEffects) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should execute login effect', () => {
    const getPlayersResult = {
      data: {
        getPlayers: [
          {
            playerNickname: 'itay',
            authToken: 'token',
            ready: false,
          },
        ],
      },
    } as FetchResult<{ getPlayers: Player[] }>;

    (lobbyService.getPlayers as jasmine.Spy).and.returnValue(
      of(getPlayersResult)
    );

    actions$ = hot('---a---', {
      a: {
        type: LobbyScreenActions.GotPlayers,
        value: new GotPlayers([new Player('itay', 'token', false)]),
      },
    });

    const expected = hot('-----a', {
      a: {
        type: LobbyScreenActions.GotPlayers,
        value: new GotPlayers([new Player('itay', 'token', false)]),
      },
    });

    expect(lobbyScreenEffects.getPlayers$).toBeObservable(expected);
  });
});
