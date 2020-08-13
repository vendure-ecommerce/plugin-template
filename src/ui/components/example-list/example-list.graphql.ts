import gql from 'graphql-tag';

export const GET_EXAMPLES = gql`
    query GetExamples($options: ExampleListOptions) {
        examples(options: $options) {
            items {
                id
                name
                createdAt
            }
            totalItems
        }
    }
`;

export const ADD_EXAMPLE = gql`
    mutation AddExample($name: String!) {
        addExample(name: $name) {
            name
        }
    }
`;
