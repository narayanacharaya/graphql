import { PrismaClient } from '@prisma/client';

// Singleton pattern for PrismaClient
class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (PrismaSingleton.instance == null) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}

export default PrismaSingleton;
