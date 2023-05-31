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
import { CrudController } from '../generic/crud.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../editFileName';
import SearchDto from './dto/search.dto';
import PaginateDto from '../generic/crud/dto/paginate.dto';

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
  async searchPieces(@Query() query: SearchDto): Promise<{ data: Piece[],
  count : number }> {
    const res = await this.pieceService.searchPieces(query);
    return {
      data: res,
      count: res.length,
    };
  }

  @Get('search/:id')
  async searchPiecesByCategory(
    @Param('id') id: number,
    @Query() query: PaginateDto | SearchDto,
  ): Promise<{ data: Piece[],
  count: number }> {
    const res = await this.pieceService.searchPiecesByCategory(id, query);
    return {
      data: res,
      count: res.length,
    };
  }
}
