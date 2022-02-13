import {  
    IsOptional, IsString,
} from 'class-validator';

export class RoomsDto {
    @IsString()
    readonly roomName: string;

    @IsString()
    readonly peerNickname: string;

    @IsOptional()
    @IsString()
    readonly peerId: string;
}
