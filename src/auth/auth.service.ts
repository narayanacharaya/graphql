// src/auth/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { generateTokens } from 'src/utils/jwt.helper';
import { Password } from 'src/utils/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  // Signup logic
  async signup(data: { email: string; name: string; password: string }) {
    console.log('AuthService.signup invoked with:', data);

    // Check if the user already exists
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await Password.toHash(data.password);

    // Create user
    const newUser = await this.userService.createUser(
      data.email,
      data.name,
      hashedPassword,
    );

    const token = generateTokens(newUser.id.toString());

    return { token, user: newUser };
  }

  // Login logic
  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const validPassword = await Password.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    const token = generateTokens(user.id.toString());

    return { token, user };
  }
}
