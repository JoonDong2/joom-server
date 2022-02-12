import { Controller, Get } from '@nestjs/common';
import { RoomsDto } from './dto/webrtc-meidator.dto';
import { WebrtcMediatorService } from './webrtc-mediator.service';

@Controller('webrtc')
export class WebrtcMediatorController {
    constructor(private readonly webrtcMediatorService: WebrtcMediatorService) {}

    @Get('rooms')
    getRooms(): RoomsDto[] {
        return this.webrtcMediatorService.getRooms();
    }
}
