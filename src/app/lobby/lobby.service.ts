import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getPlayers } from '../shared/graphql/lobby/lobby.gql';
import { QueryOptions, ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { Player } from '../player/interfaces/player.model';

@Injectable()
export class LobbyService {

  constructor(private apollo:Apollo) { }


  getPlayers():Observable<ApolloQueryResult<{getPlayers:Player[]}>> {
    const queryOptions:QueryOptions = {
      query:getPlayers
    }
    return this.apollo.query(queryOptions);
  }
}
