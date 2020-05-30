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