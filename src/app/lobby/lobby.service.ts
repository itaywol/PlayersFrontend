import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getPlayers, playerUpdated } from '../shared/graphql/lobby/lobby.gql';
import { QueryOptions, ApolloQueryResult, SubscriptionOptions } from 'apollo-client';
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

  listenToPlayerUpdates() {
    const subscriptionOptions:SubscriptionOptions<{playerUpdated:Player}> = {
      query:playerUpdated
    }
    return this.apollo.subscribe<{playerUpdated:Player}>(subscriptionOptions)
  }
}
