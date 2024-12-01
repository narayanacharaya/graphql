// user.service.ts
import { Injectable } from '@nestjs/common'; // Import Prisma service (you can use a custom Prisma service)
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // Method to get all users
  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email: email } });
  }
  // Method to create a new user
  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
