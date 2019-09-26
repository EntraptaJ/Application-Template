// API/Modules/Auth/AuthResponse.ts
import { ObjectType, Field } from 'type-graphql';
import { User } from '../Users/UserModel';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: Promise<string>;

  @Field(() => User)
  currentUser: User;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  success: boolean;

  @Field(() => String)
  token: Promise<string>;

  @Field(() => User)
  currentUser: User;
}
