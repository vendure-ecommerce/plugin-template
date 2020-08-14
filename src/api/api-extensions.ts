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
        example(id: ID!): Example
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
        addExample(input: CreateExampleInput!): Example!
        updateExample(input: UpdateExampleInput!): Example!
    }

    input CreateExampleInput {
        name: String!
    }

    input UpdateExampleInput {
        id: ID!
        name: String!
    }
`;
