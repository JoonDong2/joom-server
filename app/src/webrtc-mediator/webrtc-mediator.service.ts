import { Injectable } from '@nestjs/common';
import { WebrtcMediatorGateway } from './webrtc-mediator.gateway';

@Injectable()
export class WebrtcMediatorService {
    constructor(private readonly webrtcMediatorGateway: WebrtcMediatorGateway ) {}

    checkNickname(): boolean {
        return true;
    }

}
