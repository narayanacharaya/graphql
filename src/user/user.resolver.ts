// user.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service'; // Import the user service
import { User } from '@prisma/client'; // Import Prisma User type
import { UserType } from './user.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Query to get all users
  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // Mutation to create a new user
  @Mutation(() => UserType)
  async createUser(
    @Args('email') email: string,
    @Args('name', { nullable: true }) name: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.createUser(email, name, password);
  }
}
