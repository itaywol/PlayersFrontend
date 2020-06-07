import { FetchResult } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule,MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';
import { of } from 'rxjs';
import { Player } from 'src/app/player/interfaces/player.model';
import { CoreModule } from './../../core/core.module';
import { CoreState, coreReducer, coreStoreToken, getCurrentPlayer } from './../../core/core.reducer';
import { GetPlayers, GotPlayers, ListenToPlayerUpdates, PlayerUpdated } from './../lobby.actions';
import { LobbyService } from './../lobby.service';
import { LobbyScreenEffects } from './lobby.effects';

describe('LobbyScreenEffects', () => {
  let actions$: TestHotObservable;
  let lobbyService: LobbyService;
  let lobbyScreenEffects: LobbyScreenEffects;
  let getCurrentPlayerSelector:MemoizedSelector<CoreState,Player>;
  let router:Router;
  let store:MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        EffectsModule.forRoot([]),
        RouterTestingModule.withRoutes([]),
        EffectsModule.forFeature([LobbyScreenEffects]),
        StoreModule.forRoot({}),
      ],
      providers: [
        LobbyScreenEffects,
        LobbyService,
        Apollo,
        provideMockStore({initialState:{currentPlayer:new Player("tt","tt",false)} as CoreState}),
        provideMockActions(() => actions$),
        
      ],
    });
  });

  beforeEach(() => {
    lobbyService = TestBed.inject(LobbyService);
    lobbyScreenEffects = TestBed.inject(LobbyScreenEffects);
    router = TestBed.inject(Router)
    store = TestBed.inject(MockStore)
    getCurrentPlayerSelector = store.overrideSelector(getCurrentPlayer,new Player("tt","tt",false))
  });

  it('should be created', 
    async () => {
      expect(lobbyScreenEffects).toBeTruthy();
    }
  );

  it('should get lobby players', () => {
    getCurrentPlayerSelector = store.overrideSelector(getCurrentPlayer,new Player("tt","tt",false))

    const getPlayersResult = {
      data: {
        getPlayers: [
          new Player("i","t",false)
        ],
      },
    } as ApolloQueryResult<{ getPlayers: Player[] }>;

    spyOn(lobbyService,"getPlayers").and.returnValue(of(getPlayersResult))

    const action = new GetPlayers();
    const outcome = new GotPlayers([new Player("i","t",false)]);

    actions$ = hot("a",{a:action});

    const expected = cold("a",{a:outcome});

    expect(lobbyScreenEffects.getPlayers$).toBeObservable(expected);
  });

  it("should get emtpy list of lobby players",()=>{
    getCurrentPlayerSelector = store.overrideSelector(getCurrentPlayer,undefined)
    const getPlayersResult = {
      data: {
        getPlayers: [
        ],
      },
    } as ApolloQueryResult<{ getPlayers: Player[] }>;

    spyOn(lobbyService,"getPlayers").and.returnValue(of(getPlayersResult))
    const action = new GetPlayers();
    const error = new Error();
    const outcome = new GotPlayers([]);

    actions$ = hot("-a",{a:action});

    const expected = cold("-b",{b:outcome});

    expect(lobbyScreenEffects.getPlayers$).toBeObservable(expected)
  })

  it("should listen to player updates",()=> {
    const updatePlayerResult = {
      data: {
        playerUpdated: new Player("pp","mm",true),
      },
    } as FetchResult<{ playerUpdated: Player }>;
    spyOn(lobbyService,"listenToPlayerUpdates").and.returnValue(of(updatePlayerResult))

    const action = new ListenToPlayerUpdates();
    const outcome = new PlayerUpdated(new Player("pp","mm",true));

    actions$ = hot("a",{a:action});

    const expected = cold("a",{a:outcome});

    expect(lobbyScreenEffects.listenPlayerUpdates$).toBeObservable(expected);

  })
});
