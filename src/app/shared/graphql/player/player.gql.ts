import gql from "graphql-tag"

export const registerPlayer = gql`
    mutation registerPlayer($data:registerPlayerInput!) {
        registerPlayer(data:$data) {
            playerNickname: nickName
            authToken
            ready
        }
    }
`;

export const updatePlayer = gql`
    mutation updatePlayer($data:updatePlayerInput!) {
        updatePlayer(data:$data) {
            playerNickname: nickName
            authToken
            ready
        }
    }
`;