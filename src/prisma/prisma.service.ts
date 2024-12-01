import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  // If needed, you can implement cleanup logic on module destroy
  onModuleDestroy() {
    this.$disconnect();
  }
}
