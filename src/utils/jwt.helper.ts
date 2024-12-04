import { Injectable } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppService } from 'src/app.service';

@Injectable()
export class JwtService {
  constructor(private readonly appService: AppService) {}

  // Generate access token using userId
  generateAccessToken(userId: string): string {
    const secret: string = this.appService.getJwtSecret();
    const expiration: string = this.appService.getJwtExpiration();
    console.log(secret, expiration);
    console.log('JWT:', userId);
    const payload = { userId };
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  }

  // Function to generate tokens (currently only access token)
  generateTokens(userId: string): { accessToken: string } {
    const accessToken = this.generateAccessToken(userId);
    return { accessToken };
  }

  // Verify the token and return the decoded payload
  verifyToken(token: string): JwtPayload | string {
    const secret = this.appService.getJwtSecret();

    try {
      return jwt.verify(token, secret);
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw new Error('Token has expired');
      }
      if (err.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      }
      throw new Error('Unable to verify token: ' + err.message);
    }
  }
}
