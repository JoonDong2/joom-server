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

interface Socket extends OriginSocket {
    nickname : string;
}

@WebSocketGateway({namespace: 'webrtc/socket'})
export class WebrtcMediatorGateway implements OnGatewayInit,
OnGatewayConnection,
OnGatewayDisconnect {
    sockets : Socket[];

    private logger : Logger = new Logger('WebrtcMediatorGateway');
    @WebSocketServer()
    server : Server;

    // 게이트웨이가 초기화되고 나서 실행
    afterInit(server : any) {
        this.logger.log('Initialize WebrtcMediatorGateway!');
    }

    handleConnection(client : Socket, ...args : any[]) {

        client.nickname = client.handshake.query.nickname as string;
        this.logger.log(`Client connected: ${client.handshake.query.nickname}`);
        return 'hello';
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
