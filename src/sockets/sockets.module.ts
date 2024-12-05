import { Module } from '@nestjs/common';
import { AppGateway } from './gateways/app.gateway';
import { NotificationService } from './services/notification.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AppGateway, NotificationService],
  exports: [AppGateway],
})
export class SocketsModule {}
