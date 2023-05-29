import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePieceDto {

    @IsNotEmpty()
    @IsString()
    piece: string;
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsString()
    constructorReference: string;
    @IsOptional()
    comments: string;
    @IsNotEmpty()
    brand: string;
    @IsNotEmpty()
    @IsString()
    model: string;
    @IsNotEmpty()
    @IsString()
    motorization: string;
    @IsNotEmpty()
    @IsString()
    category: string;
    @IsNotEmpty()
    @IsString()
    subcategory:string;

}
