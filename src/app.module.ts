import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthResolver } from './auth/auth.resolver';
import { UserResolver } from './user/user.resolver';
import { PostResolver } from './post/post.resolver';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';

// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver, // Required "driver" option
//       autoSchemaFile: true, // Automatically generates the schema
//       context: ({ req, res }) => {
//         console.log('Request Headers in Context:', req.headers);
//         return { req, res };
//       },
//     }),
//   ],
//   providers: [AuthResolver, UserResolver, PostResolver], // Register the resolvers
// })
// export class AppModule {}
@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Required "driver" option
      autoSchemaFile: true, // Automatically generates the schema
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
  ],
  providers: [AuthResolver, UserResolver, PostResolver],
})
export class AppModule {}
