import gql from 'graphql-tag';

export const commonApiExtensions = gql`
    type Example implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
    }

    type ExampleList implements PaginatedList {
        items: [Example!]!
        totalItems: Int!
    }

    extend type Query {
        examples(options: ExampleListOptions): ExampleList!
    }

    # Auto-generated at runtime
    input ExampleListOptions
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    extend type Mutation {
        addExample(name: String!): Example!
    }
`;
