import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}

export class UserResponse {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;
}
