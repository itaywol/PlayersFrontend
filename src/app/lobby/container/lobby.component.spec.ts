import { getPlayers } from './../../shared/graphql/lobby/lobby.gql';
import { LobbyScreenEffects } from './../effects/lobby.effects';
import { EffectsModule } from '@ngrx/effects';
import { PlayerModule } from './../../player/player.module';
import { CoreState, getLobbyPlayers, getCurrentPlayer, coreStoreToken } from './../../core/core.reducer';
import { CoreModule } from './../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MainmenuComponent } from './../../mainmenu/mainmenu.component';
import { RouterModule, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LobbyService } from './../lobby.service';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { LobbyComponent } from './lobby.component';
import { Apollo } from 'apollo-angular';
import { Player } from 'src/app/player/interfaces/player.model';
import { StoreModule, MemoizedSelector } from '@ngrx/store';

describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;
  let store: MockStore<any>;
  let router: Router;
  let lobbyService: LobbyService;
  let getLobbyPlayersSelector:MemoizedSelector<CoreState,Player[]>;
  let getCurrentPlayerSelector:MemoizedSelector<CoreState,Player>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LobbyComponent],
      imports: [
        BrowserAnimationsModule,
        MatRippleModule,
        MatCardModule,
        CoreModule,
        PlayerModule,
        RouterTestingModule.withRoutes([]),
        EffectsModule.forRoot([]),
        StoreModule.forRoot([]),
      ],
      providers: [
        LobbyService,
        Apollo,
        provideMockStore({
          initialState: {
            players: [new Player('dd', 'dd', false)],
          } as CoreState,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.debugElement.componentInstance;
    lobbyService = TestBed.inject(LobbyService);
    getLobbyPlayersSelector = store.overrideSelector(getLobbyPlayers,[new Player("tt","tt",false)])
    
  });

  it('should create component',() => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to main menu on empty current player', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    getCurrentPlayerSelector = store.overrideSelector(getCurrentPlayer,undefined)
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['/main-menu']);
  }));

  it('should stay at lobby', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    getCurrentPlayerSelector = store.overrideSelector(getCurrentPlayer,new Player("itay","istestingalot",false))
    component.ngOnInit();

    fixture.detectChanges();
    tick();

    expect(navigateSpy).not.toHaveBeenCalledWith(['/main-menu']);

  }))
});
