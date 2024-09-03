import { gql } from "graphql-tag";

export const shopSchema = gql`
  extend type Query {
    exampleQuery: String!
  }
`;
export const exampleEntityAdminApiExtensions = gql`
  type ExampleEntity implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    code: String!
  }

  type ExampleEntityList implements PaginatedList {
    items: [ExampleEntity!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input ExampleEntityListOptions

  extend type Query {
    exampleEntity(id: ID!): ExampleEntity
    exampleEntities(options: ExampleEntityListOptions): ExampleEntityList!
  }

  input CreateExampleEntityInput {
    code: String!
  }

  input UpdateExampleEntityInput {
    id: ID!
    code: String
  }

  extend type Mutation {
    createExampleEntity(input: CreateExampleEntityInput!): ExampleEntity!
    updateExampleEntity(input: UpdateExampleEntityInput!): ExampleEntity!
    deleteExampleEntity(id: ID!): DeletionResponse!
  }
`;
