import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebrtcMediatorModule } from './webrtc-mediator/webrtc-mediator.module';

@Module({
  imports: [WebrtcMediatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
