// src/post/post.module.ts
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule to access PrismaService
  providers: [PostService, PostResolver],
  exports: [PostService], // Export PostService if needed in other modules
})
export class PostModule {}
