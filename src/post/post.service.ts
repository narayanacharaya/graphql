// src/post/services/post.service.ts
import { Injectable } from '@nestjs/common';

import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './create-post.dto';
import { PostType } from './post.schema';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all posts
  async getAllPosts(): Promise<PostType[]> {
    const posts = await this.prisma.post.findMany();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  // Create a new post
  async createPost(
    createPostDto: CreatePostDto,
    authorId: string,
  ): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
    });
  }
}
