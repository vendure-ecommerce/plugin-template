import gql from 'graphql-tag';

export const shopApiExtensions = gql`
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
