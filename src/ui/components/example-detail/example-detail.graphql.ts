import gql from 'graphql-tag';

export const CREATE_EXAMPLE = gql`
    mutation CreateExample($input: CreateExampleInput!) {
        createExample(input: $input) {
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
