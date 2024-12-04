import { Module } from '@nestjs/common';
import { JwtService } from './jwt.helper';
import { AppService } from 'src/app.service';

@Module({
  providers: [JwtService, AppService],
  exports: [JwtService, AppService],
})
export class UtilsModule {}
