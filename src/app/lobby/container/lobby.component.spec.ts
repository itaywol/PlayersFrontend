import { RouterModule, Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LobbyService } from './../lobby.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LobbyComponent } from './lobby.component';
import { Apollo } from 'apollo-angular';

describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;
  let store:Store<any>
  let router:Router;
  let lobbyService:LobbyService

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyComponent ],
      imports: [
        BrowserAnimationsModule,
        MatRippleModule,
        MatCardModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
      ],
      providers:[LobbyService,Apollo]
    })
    .compileComponents();
  }));

  beforeEach((() => {
    store = TestBed.inject(Store)
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    lobbyService = TestBed.inject(LobbyService);
  }));

  it('should not create because of missing currentPlayerState', () => {
    expect(component).toBeUndefined()
  });

  // it('should have players', () => {
    
  //   let lobbyService = fixture.debugElement.injector.get(LobbyService)
  //   lobbyService.getPlayers()
  //   expect()
  // })
});
