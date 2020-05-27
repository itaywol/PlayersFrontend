
import gql from "graphql-tag"
export const registerMutation = gql`
    mutation registerPlayer($data:registerPlayerInput!) {
        registerPlayer(data:$data) {
            nickName
            authToken
            ready
        }
    }
`;