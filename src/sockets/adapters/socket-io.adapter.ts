import { IoAdapter } from '@nestjs/platform-socket.io';
import { Injectable } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service'; // Make sure this import is correct
// import { verifyToken } from 'src/utils/jwt.helper'; // Assuming verifyToken is in utils/jwt.helper

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  // constructor(private readonly authService: AuthService) {
  //   super();
  // }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket, next) => {
      console.log('Received connection request');
      console.log('Socket handshake details:', socket.handshake); // Log handshake details for better debugging
      next();
    });
    // server.use((socket, next) => {
    //   const token = socket.handshake.auth.token;
    //   if (!token) {
    //     return next(new Error('Authentication error: No token provided'));
    //   }

    //   try {
    //     const payload = verifyToken(token); // Your JWT verification logic
    //     socket.userId = payload.sub; // Attach user info to socket
    //     next(); // Proceed if token is valid
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   } catch (error) {
    //     return next(new Error('Authentication error: Invalid token'));
    //   }
    // });

    return server;
  }
}
