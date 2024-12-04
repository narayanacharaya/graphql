import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenResponse } from './token-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query(() => String)
  getAuthStatus(): string {
    return 'Auth is working!';
  }
  // Mutation for user signup (creating a user and generating a token)
  @Mutation(() => TokenResponse, { name: 'signup' })
  async signup(
    @Args('email') email: string,
    @Args('name', { nullable: true }) name: string,
    @Args('password') password: string,
  ): Promise<TokenResponse> {
    try {
      const { token } = await this.authService.signup({
        email,
        name,
        password,
      });
      return new TokenResponse(token.accessToken);
    } catch (error) {
      console.error(error);
      throw new Error('Error during signup: ' + error);
    }
  }

  @Mutation(() => TokenResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<TokenResponse> {
    const { token } = await this.authService.login(email, password);
    return new TokenResponse(token.accessToken);
  }
}
