import {  
    IsOptional, IsString,
} from 'class-validator';

export class RoomsDto {
    @IsString()
    readonly roomName: string;

    @IsString()
    readonly peerName: string;

    @IsOptional()
    @IsString()
    readonly peerId: string;
}
