// API/src/Modules/Utilities/UtilitiesResolver.ts
import { Resolver, Query } from 'type-graphql'

@Resolver()
export class UtilitiesResolver {
  @Query(() => String)
  async helloWorld(): Promise<string> {
    return 'HelloWorld'
  }
}