// src/auth/dto/token-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
