// API/Modules/Auth/AuthResponse.ts
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AuthResponse {
  @Field()
  token: string
}

@ObjectType()
export class RegisterResponse {
  @Field()
  success: boolean
}
