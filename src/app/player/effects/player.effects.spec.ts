import { updatePlayer } from './../../shared/graphql/player/player.gql';
import { PlayerModule } from './../player.module';
import { PlayerDTO } from './../interfaces/player.interface';
import { LoginAction, LoginSuccess, HitReady, AckReady } from './../player.actions';
import { Player } from './../interfaces/player.model';
import { PlayerEffects } from './player.effects';
import { PlayerService } from './../player.service';
import { FetchResult } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule,MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';
import { of } from 'rxjs';
import { CoreModule } from './../../core/core.module';
import { CoreState, coreReducer, coreStoreToken, getCurrentPlayer } from './../../core/core.reducer';

describe('PlayerEffects', () => {
  let actions$: TestHotObservable;
  let playerService: PlayerService;
  let playerEffects: PlayerEffects;
  let getCurrentPlayerSelector:MemoizedSelector<CoreState,Player>;
  let router:Router;
  let store:MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        PlayerModule,
        EffectsModule.forRoot([]),
        RouterTestingModule.withRoutes([]),
        EffectsModule.forFeature([PlayerEffects]),
        StoreModule.forRoot({}),
      ],
      providers: [
        PlayerEffects,
        PlayerService,
        Apollo,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  });

  beforeEach(() => {
    playerService = TestBed.inject(PlayerService);
    playerEffects = TestBed.inject(PlayerEffects);
    router = TestBed.inject(Router)
    store = TestBed.inject(MockStore)
    getCurrentPlayerSelector = store.overrideSelector(getCurrentPlayer,new Player("tt","tt",false))
  });

  it('should be created', 
    async () => {
      expect(playerEffects).toBeTruthy();
    }
  );

  it('should login a player', () => {

    const loginPlayerResult = {
      data: {
        registerPlayer: 
          new Player("itay","wolfish",false),
      },
    } as FetchResult<{ registerPlayer: Player}>;

    spyOn(playerService,"registerPlayer").and.returnValue(of(loginPlayerResult))

    const action = new LoginAction("itay");
    const outcome = new LoginSuccess(new Player("itay","wolfish",false));

    actions$ = hot("a",{a:action});

    const expected = cold("a",{a:outcome});

    expect(playerEffects.loginAction$).toBeObservable(expected);
  });

  it("should be ready and navigate to lobby",fakeAsync(()=>{
      const routerSpy = spyOn(router,"navigate")

      const action = new LoginSuccess({playerNickname:"itaywol",authToken:"token",ready:true} as PlayerDTO)

      actions$ = hot("a",{a:action})

      playerEffects.loginSuccess$.subscribe(()=>{
          expect(routerSpy).toHaveBeenCalledWith(["/lobby"])
      })
      tick();
  }))

  it("should become ready",()=>{
    const updatePlayerResult = {
        data: {
          updatePlayer: 
            new Player("itay","wolfish",true),
        },
      } as FetchResult<{ updatePlayer: Player}>;
  
      spyOn(playerService,"updatePlayer").and.returnValue(of(updatePlayerResult))
  
      const action = new HitReady(new Player("itay","wolfish",false));
      const outcome = new AckReady(new Player("itay","wolfish",true));
  
      actions$ = hot("a",{a:action});
  
      const expected = cold("a",{a:outcome});
  
      expect(playerEffects.becomeReady$).toBeObservable(expected);

  })
});
