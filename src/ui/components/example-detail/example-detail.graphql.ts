import gql from 'graphql-tag';

export const ADD_EXAMPLE = gql`
    mutation AddExample($name: String!) {
        addExample(name: $name) {
            id
            name
        }
    }
`;
