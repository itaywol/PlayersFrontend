import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { Apollo } from 'apollo-angular';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[PlayerService,Apollo]});
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
