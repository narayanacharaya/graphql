// src/post/post.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './post.schema'; // GraphQL type for Post
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/gurd/auth.gurd';

@Resolver()
@UseGuards(AuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Query(() => String)
  getAuthStatus(): string {
    return 'Auth is working!';
  }
  // Ensure the method signature matches the return type
  @Query(() => [PostType]) // Declare the query return type as an array of PostType
  async posts(): Promise<PostType[]> {
    // Ensure the return type is Promise<PostType[]>
    const posts = await this.postService.getAllPosts();
    return posts; // Return the transformed PostType array
  }
}
