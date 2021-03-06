import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody
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
    // 서비스 객체를 가져오지 못한다. 왜지?
    // constructor(private readonly webrtcMediatorService: WebrtcMediatorService) {}

    private logger : Logger = new Logger('WebrtcMediatorGateway');

    @WebSocketServer()
    server : Server;    

    // 게이트웨이가 초기화되고 나서 실행
    afterInit(server : any) {
        this.logger.log('Initialize WebrtcMediatorGateway!');
    }

    handleConnection(client : Socket, ...args : any[]) {
        try {
            const type = client.handshake.query.type as 'owner' | 'visitor';
            const roomName = client.handshake.query.roomName as string;
            const password = client.handshake.query.password as string | undefined;
            const nickname = client.handshake.query.nickname as string;
    
            this.logger.log(`Client connected: ${type} ${nickname} ${roomName} ${password}`);
    
            if (!type || !roomName) throw new Error('잘못된 접근입니다.');
    
            client.type = type;
            client.nickname = nickname
            client.password = type === 'owner' ? password : undefined;

            const rooms: Map<string, Set<string>> = this.server.adapter['rooms'];
    
            if (type === 'owner') {
                // roomName 중복 검사
                if (rooms.get(roomName)) throw new Error('동일한 이름의 방이 존재합니다.');
    
                // roomName 방 생성
                client.emit('connect_successful');
                client.join(roomName);
            } else if (type === 'visitor') {
                // roomName owner 정보 가져오기
                const sockets = this.server.sockets as unknown as Map<string, Socket>;
                const connectedIdSet = rooms.get(roomName);

                if (!connectedIdSet || connectedIdSet.size !== 1) return;
                
                const connectedId = [...connectedIdSet][0];
                const owner = sockets.get(connectedId);

                // 닉네임 검사
                if (owner.nickname === nickname) {
                    throw new Error('다른 닉네임을 사용해 주세요.');
                }
    
                // 전송된 password와 owner의 password 비교
                if (!owner || owner.type !== 'owner') throw new Error('존재하지 않는 방입니다.');
                if (owner.password && owner.password !== password) {
                    throw new Error('비밀번호가 다릅니다.');
                }
    
                client.emit('connect_successful');
                client.join(roomName);
            } else {
                throw new Error('잘못된 접근입니다.');
            }
        } catch (e) {
            client.emit('disconnect_message', e.message);
            client.disconnect();
        }
    }

    handleDisconnect(client : Socket) {
        this.logger .log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('exit_visitor')
    handleExitVisitor(client : Socket, payload: {
        roomName: string;
    }) {
        if(client.type !== 'visitor' || !payload?.roomName) return;
        this.logger.log("exit", client.nickname, payload);
        client.to(payload.roomName).emit('exit_visitor', { nickname: client.nickname });
    }

    @SubscribeMessage('exit_owner')
    handleExitOwner(client : Socket, payload: {
        roomName: string;
    }) {
        if(client.type !== 'owner' || !payload?.roomName) return;
        this.logger.log("exit", client.nickname, payload);
        client.to(payload.roomName).emit('exit_owner', { nickname: client.nickname });
    }

    @SubscribeMessage('offer')
    handleOffer(client : any, payload: {
        roomName: string;
        offer: any;
    }) {
        this.logger.log("offer", payload);
        client.to(payload.roomName).emit('offer', payload.offer);
    }

    @SubscribeMessage('answer')
    handleAnswer(client : any, payload: {
        roomName: string;
        answer: any;
    }) {
        this.logger.log("answer", client.nickname, payload.roomName);
        client.to(payload.roomName).emit('answer', payload.answer);
    }

    @SubscribeMessage('icecandidate')
    handleIce(client : any, payload: {
        roomName: string;
        icecandidate: any;
    }) {
        this.logger.log("icecandidate", payload);
        client.to(payload.roomName).emit('icecandidate', payload.icecandidate);
    }
}
