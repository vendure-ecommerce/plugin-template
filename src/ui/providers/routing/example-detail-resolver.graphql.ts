import gql from 'graphql-tag';

export const GET_EXAMPLE = gql`
    query GetExample($id: ID!) {
        example(id: $id) {
            id
            name
            createdAt
        }
    }
`;
