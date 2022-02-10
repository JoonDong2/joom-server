import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {Logger} from '@nestjs/common';

@WebSocketGateway({
    namespace: 'webrtc'
})
export class WebrtcMediatorGateway implements OnGatewayInit,
OnGatewayConnection,
OnGatewayDisconnect {
    private logger : Logger = new Logger('WebrtcMediatorGateway');
    @WebSocketServer()
    server : Server;
// 게이트웨이가 초기화되고 나서 실행
    afterInit(server : any) {
        this
            .logger
            .log('Initialize WebrtcMediatorGateway!');
    }

    handleConnection(client : Socket, ...args : any[]) {
        this
            .logger
            .log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client : Socket) {
        this
            .logger
            .log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(client : any, payload : any) : string {return 'Hello world!';}
}
