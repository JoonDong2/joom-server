import { Module } from '@nestjs/common';
import { WebrtcMediatorController } from './webrtc-mediator.controller';
import { WebrtcMediatorGateway } from './webrtc-mediator.gateway';
import { WebrtcMediatorService } from './webrtc-mediator.service';

@Module({
    imports: [],
    controllers: [WebrtcMediatorController],
    providers: [WebrtcMediatorService, WebrtcMediatorGateway],
})
export class WebrtcMediatorModule {}
