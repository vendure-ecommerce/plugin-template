import gql from 'graphql-tag';

export const GET_EXAMPLE_ENTITY_LIST = gql`
    query GetExampleEntityList($options: ExampleEntityListOptions) {
        exampleEntities(options: $options) {
            items {
                id
                code
            }
            totalItems
        }
    }
`