import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { PieceService } from './piece.service';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { Piece } from './entities/piece.entity';
import { CrudController } from 'src/generic/crud/Crud.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'editFileName';

@Controller('pieces')
export class PieceController extends CrudController<
  Piece,
  CreatePieceDto,
  UpdatePieceDto
> {
  constructor(private readonly pieceService: PieceService) {
    super(pieceService);
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../frontend/public',
        filename: editFileName,
      }),
    }),
  )
  async addPiece(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreatePieceDto,
  ) {
    
    if (image) {
    dto.image = image.filename;
    }
    return this.pieceService.add(dto);
  }

  @Get('search')
  async searchPieces(
    @Query('brand') brand: string,
    @Query('model') model: string,
    @Query('motorization') motorization: string,
    @Query('sortBy') sortBy: string,
  ): Promise<Piece[]> {
    const results = await this.pieceService.searchPieces(
      brand,
      model,
      motorization,
      sortBy,
    );
    return results;
  }
}
