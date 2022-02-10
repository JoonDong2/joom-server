import { Controller, Get } from '@nestjs/common';
import { WebrtcMediatorService } from './webrtc-mediator.service';

@Controller('webrtc')
export class WebrtcMediatorController {
    constructor(private readonly webrtcMediatorService: WebrtcMediatorService) {}

    @Get(':id')
    checkNickname(): boolean {
        return this.webrtcMediatorService.checkNickname();
    }
}
