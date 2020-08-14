import gql from 'graphql-tag';

export const GET_EXAMPLES = gql`
    query GetExamples {
        examples {
            items {
                name
            }
            totalItems
        }
    }
`;

export const GET_EXAMPLE = gql`
    query GetExample($id: ID!) {
        example(id: $id) {
            name
        }
    }
`;
