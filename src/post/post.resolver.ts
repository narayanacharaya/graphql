import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './post.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/gurd/auth.gurd';
import { CreatePostDto } from './create-post.dto';

@Resolver()
@UseGuards(AuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostType])
  async posts(): Promise<PostType[]> {
    return await this.postService.getAllPosts();
  }

  @Mutation(() => PostType)
  async createPost(
    @Args('input') input: CreatePostDto,
    @Context() context: any,
  ): Promise<PostType> {
    const userId = context.req.userId;
    if (!userId) {
      throw new Error('Unauthorized for post creation');
    }
    return await this.postService.createPost(input, userId);
  }
}
