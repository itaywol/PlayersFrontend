import gql from "graphql-tag"

export const getPlayers = gql`
    query getPlayers {
        getPlayers {
            playerNickname: nickName
            ready
        }
    }
`;

export const playerUpdated = gql`
    subscription playerUpdated {
        playerUpdated {
            playerNickname: nickName
            ready
        }
    }
`;