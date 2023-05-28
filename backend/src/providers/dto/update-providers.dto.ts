import { IsOptional, IsString } from "class-validator";

export class UpdateprovidersDto{
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    logo?: string;
    @IsOptional()
    @IsString()
    city: string;
    @IsOptional()
    @IsString()
    address: string;
    @IsOptional()
    @IsString()
    phone: string;
    @IsOptional()
    @IsString()
    whatsapp?: string;
    @IsOptional()
    @IsString()
    facebook?: string;  
    @IsOptional()
    @IsString()  
    messenger?: string;
    @IsOptional()
    @IsString()
    observation?: string;
}