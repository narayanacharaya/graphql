import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module'; // Import UserModule here
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService], // Make sure AuthService is listed here
})
export class AuthModule {}
