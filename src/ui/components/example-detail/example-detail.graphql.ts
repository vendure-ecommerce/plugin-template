import gql from 'graphql-tag';

export const ADD_EXAMPLE = gql`
    mutation AddExample($input: CreateExampleInput!) {
        addExample(input: $input) {
            id
            name
        }
    }
`;

export const UPDATE_EXAMPLE = gql`
    mutation UpdateExample($input: UpdateExampleInput!) {
        updateExample(input: $input) {
            id
            name
        }
    }
`;
