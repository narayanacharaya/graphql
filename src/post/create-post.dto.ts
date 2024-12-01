// src/post/dto/create-post.dto.ts

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;
}
