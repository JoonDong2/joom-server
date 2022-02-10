import {  
    IsNumber,
} from 'class-validator';

export class CheckNicknameDto {
    @IsNumber()
    readonly id: number;
}