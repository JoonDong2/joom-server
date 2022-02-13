import { Injectable } from '@nestjs/common';
import { RoomsDto } from './dto/webrtc-meidator.dto';
import {  Socket, WebrtcMediatorGateway } from './webrtc-mediator.gateway';

@Injectable()
export class WebrtcMediatorService {
    constructor(private readonly webrtcMediatorGateway: WebrtcMediatorGateway) {}

    getRooms(): RoomsDto[] {
        const sids: Map<string, Set<string>> = this.webrtcMediatorGateway.server.adapter['sids'];
        const rooms: Map<string, Set<string>> = this.webrtcMediatorGateway.server.adapter['rooms'];
        const sockets = this.webrtcMediatorGateway.server.sockets as unknown as Map<string, Socket>;

        const pureRooms: RoomsDto[] = [];
        rooms.forEach((connectedIdSet, roomName) => {
            if (connectedIdSet.size !== 1 || sids.has(roomName)) return;
            const connectedId = [...connectedIdSet][0];
            const { type, nickname, password } = sockets.get(connectedId);
            if (type !== 'owner') return;
            pureRooms.push({
                roomName,
                peerId: !password ? connectedId : undefined,
                peerNickname: nickname,
            });
        });

        return pureRooms;
    }
}
