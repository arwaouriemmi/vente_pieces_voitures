import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PieceService } from './piece.service';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { FileUploadService } from 'src/generic/upload/FileUpload.service';
import { Piece } from './entities/piece.entity';

import { CrudController } from 'src/generic/crud/Crud.controller';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pieces')
export class PieceController extends CrudController<Piece, CreatePieceDto, UpdatePieceDto> {

  constructor(private readonly pieceService: PieceService, private readonly fileUploadService: FileUploadService) {
    super(pieceService);
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async add(@Body() dto: CreatePieceDto,@UploadedFile()image:Express.Multer.File) {
    await this.fileUploadService.uploadFile(image)
    console.log(image);
    return this.pieceService.create(dto);
  }
  @Get('search')
  async searchPieces(
    @Query('brand') brand: string,
    @Query('model') model: string,
    @Query('motorization') motorization: string,
    @Query('sortBy') sortBy: string,
  ): Promise<Piece[]> {
    const results = await this.pieceService.searchPieces(brand, model, motorization, sortBy);
    return results;
  }


}
