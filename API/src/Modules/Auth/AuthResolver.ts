// API/Modules/Auth/AuthResolver.ts
import { Resolver, Mutation, Arg, ArgumentValidationError } from 'type-graphql';
import { AuthResponse, RegisterResponse } from './AuthResponse';
import {
  LoginInput,
  RegisterInput,
  RequestPasswordResetInput,
} from './AuthInput';
import { User } from 'API/Modules/Users/UserModel';
import { hasSetup } from '../Utilities/hasSetup';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async login(@Arg('input') { username, password }: LoginInput): Promise<
    AuthResponse
  > {
    const user = await User.findOne({ where: { username } });
    if (!user)
      throw new ArgumentValidationError([
        {
          property: 'username',
          constraints: {
            isValid: 'User not found',
          },
          children: [],
        },
      ]);

    return { token: await user.generateToken(password) };
  }

  @hasSetup(true)
  @Mutation(() => RegisterResponse)
  async register(@Arg('input')
  {
    username,
    password,
    email,
  }: RegisterInput): Promise<RegisterResponse> {
    const user = User.create({ username, email });
    await user.setPassword(password);
    await user.save();
    return { success: true };
  }

  @Mutation(() => Boolean)
  async resetPasswordReset(@Arg('input')
  {
    email,
  }: RequestPasswordResetInput): Promise<boolean> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ArgumentValidationError([
        {
          property: 'email',
          constraints: {
            isValid: 'Email not found.',
          },
          children: [],
        },
      ]);
    }

    // await user.requestUserPasswordReset();
    return true;
  }
}
