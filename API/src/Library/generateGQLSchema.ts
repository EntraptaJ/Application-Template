// API/Library/getGraphQLSchema.ts
import { GraphQLSchema } from 'graphql'
import { resolve } from 'path'
import { buildSchema } from 'type-graphql'

export function generateGQLSchema(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [
      resolve(`${__dirname}/../Modules/**/*Resolver.ts`),
      resolve(`${__dirname}/../Modules/**/*Resolver.js`),
    ],
  })
}
