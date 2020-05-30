import gql from "graphql-tag"

export const getPlayers = gql`
    query getPlayers {
        getPlayers {
            playerNickname: nickName
            authToken
            ready
        }
    }
`;