import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateprovidersDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  logo?: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsString()
  email: string;
  @IsNotEmpty()
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
