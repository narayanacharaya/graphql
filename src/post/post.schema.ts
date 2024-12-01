// src/post/schema/post.schema.ts
import { ObjectType, Field, ID } from '@nestjs/graphql'; // NestJS GraphQL decorators
import { Post } from '@prisma/client'; // Import the Prisma Post model if needed (optional)

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
