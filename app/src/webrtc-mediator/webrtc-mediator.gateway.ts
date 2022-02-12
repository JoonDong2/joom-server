import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import {Socket as OriginSocket, Server} from 'socket.io';
import {Logger} from '@nestjs/common';

export interface Socket extends OriginSocket {
    type: 'owner' | 'visitor'; 
    nickname: string;
    roomName: string;
    password?: string;
}

@WebSocketGateway({namespace: 'webrtc/socket'})
export class WebrtcMediatorGateway implements OnGatewayInit,
OnGatewayConnection,
OnGatewayDisconnect {
    private logger : Logger = new Logger('WebrtcMediatorGateway');
    @WebSocketServer()
    server : Server;

    // 게이트웨이가 초기화되고 나서 실행
    afterInit(server : any) {
        this.logger.log('Initialize WebrtcMediatorGateway!');
    }

    handleConnection(client : Socket, ...args : any[]) {
        const type = client.handshake.query.type as 'owner' | 'visitor';
        const roomName = client.handshake.query.roomName as string;
        const password = client.handshake.query.password as string | undefined;
        client.type = type;
        client.nickname = client.handshake.query.nickname as string;
        client.password = type === 'owner' ? password : undefined;

        if (type === 'owner') { 
            // TODO: roomName 방 생성
        } else if (type === 'visitor') {
            // TODO: roomName owner 정보 가져오기
            // TODO: 전송된 password와 owner의 password 비교
            // TODO: roomName 방 입장
        } else {
            client.disconnect();
        }
        this.logger.log(`Client connected: ${client.handshake.query.nickname}`);
    }

    handleDisconnect(client : Socket) {
        this.logger .log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(client : any, payload : any) {
        this.logger.log("message", client.nickname, payload);
        client.emit('welcome', {message: 'welcome'});
    }
}
