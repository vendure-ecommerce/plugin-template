import gql from 'graphql-tag';

export const commonApiExtensions = gql`
    type Example implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
    }

    extend type Query {
        examples: [Example!]!
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    extend type Mutation {
        addExample(name: String!): Example!
    }
`
