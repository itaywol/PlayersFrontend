import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {FetchResult } from 'apollo-link';
import { MutationOptions } from 'apollo-client';
import { registerPlayer, updatePlayer } from '../shared/graphql/player/player.gql';
import { Observable } from 'rxjs';
import { Player } from './interfaces/player.model';

@Injectable()
export class PlayerService {

  constructor(private apollo:Apollo) { }


  registerPlayer(nickname:string) {
    const mutationOptions:MutationOptions<{registerPlayer:Player}> = {
      mutation: registerPlayer,
      variables:{
        data: {
          nickName:nickname
        }
      }
    }

    return this.apollo.mutate(mutationOptions)
  }

  updatePlayer(authToken:string,ready:boolean) {
    const mutationOptions:MutationOptions<{updatePlayer:Player}> = {
      mutation: updatePlayer,
      variables:{
        data: {
          authToken:authToken,
          ready:ready
        }
      }
    }

    return this.apollo.mutate(mutationOptions)
  }
}
