import { Player } from './../player/interfaces/player.model';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LobbyService } from './lobby.service';
import { Apollo } from 'apollo-angular';
import {ApolloTestingModule, ApolloTestingController} from "apollo-angular/testing"
import { getPlayers } from '../shared/graphql/lobby/lobby.gql';

describe('LobbyService', () => {
  let service: LobbyService;
  let controller: ApolloTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[ApolloTestingModule],providers:[LobbyService,Apollo]});
    service = TestBed.inject(LobbyService);
    controller = TestBed.inject(ApolloTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get players",fakeAsync(()=>{
    service.getPlayers().subscribe((players)=>{
      expect(players.data.getPlayers[0].playerNickname).toEqual("itay")
      expect(players.data.getPlayers.length).toEqual(1);
    })

    const op = controller.expectOne(getPlayers)

    op.flush({data:{getPlayers:[new Player("itay","token",false)]}})
    tick();
  }))

  afterEach(()=>{
    controller.verify();
  })
});
