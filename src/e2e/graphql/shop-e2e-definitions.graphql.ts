import gql from 'graphql-tag';

export const GET_EXAMPLES = gql`
    query GetExamples {
        examples {
            id
            name
        }
    }
`;