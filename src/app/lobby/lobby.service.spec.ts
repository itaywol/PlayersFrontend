import { TestBed } from '@angular/core/testing';

import { LobbyService } from './lobby.service';
import { Apollo } from 'apollo-angular';

describe('LobbyService', () => {
  let service: LobbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[LobbyService,Apollo]});
    service = TestBed.inject(LobbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
