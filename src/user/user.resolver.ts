// user.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';

import { UserResponse, UserType } from './user.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Query to get all users
  @Query(() => [UserType])
  async users(): Promise<UserResponse[]> {
    return this.userService.getAllUsers();
  }

  // Mutation to create a new user
  // @Mutation(() => UserType)
  // async createUser(
  //   @Args('email') email: string,
  //   @Args('name', { nullable: true }) name: string,
  //   @Args('password') password: string,
  // ): Promise<User> {
  //   return this.userService.createUser(email, name, password);
  // }
}
