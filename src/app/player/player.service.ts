import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, FetchResult } from 'apollo-link';
import { MutationOptions } from 'apollo-client';
import { registerPlayer } from '../shared/graphql/player/player.gql';

@Injectable()
export class PlayerService {

  constructor(private apollo:Apollo) { }


  registerPlayer(nickname:string) {
    const mutationOptions:MutationOptions = {
      mutation: registerPlayer,
      variables:{
        data: {
          nickName:nickname
        }
      }
    }

    return this.apollo.mutate(mutationOptions)
  }
}
