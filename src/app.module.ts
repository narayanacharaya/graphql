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
import { AppGateway } from './sockets/gateways/app.gateway';
import { NotificationService } from './sockets/services/notification.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/utils.module';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    PostModule,
    UtilsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
  ],
  providers: [
    AuthResolver,
    UserResolver,
    PostResolver,
    AppGateway,
    NotificationService,
    AppService,
  ],
})
export class AppModule {
  constructor(private readonly appGateway: AppGateway) {
    console.log('AppModule initialized. AppGateway injected.');
  }
}
