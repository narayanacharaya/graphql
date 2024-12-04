import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from 'src/utils/jwt.helper';
import { Password } from 'src/utils/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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
    console.log(newUser.id);
    // Generate the token using JwtService
    const token = this.jwtService.generateTokens(newUser.id).accessToken;

    return { token, user: newUser };
  }

  // Login logic
  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const validPassword = await Password.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    // Generate the token using JwtService
    const token = this.jwtService.generateTokens(user.id).accessToken;

    return { token, user };
  }
}
