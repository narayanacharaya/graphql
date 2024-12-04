import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from '@prisma/client';

@ObjectType()
@ObjectType()
export class PostType implements Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field() // Make content required here
  content: string | null;

  @Field()
  authorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
