import { IsNotEmpty, IsString } from "class-validator";

export class CreateprovidersDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    logo?: string;
    @IsNotEmpty()
    @IsString()
    city: string;
    @IsNotEmpty()
    @IsString()
    address: string;
    @IsNotEmpty()
    @IsString()
    phone: string;
    @IsNotEmpty()
    @IsString()
    whatsapp?: string;
    @IsNotEmpty()
    @IsString()
    facebook?: string;  
    @IsNotEmpty()
    @IsString() 
    messenger?: string;
    @IsNotEmpty()
    @IsString()
    observation?: string;
}   