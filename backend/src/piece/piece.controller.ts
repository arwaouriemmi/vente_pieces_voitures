import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PieceService } from './piece.service';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { Piece } from './entities/piece.entity';
import { CrudController } from '../generic/crud/crud.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileUploadOptions } from '../editFileName';
import SearchDto from './dto/search.dto';
import { returnData } from './dto/return.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoleEnum } from 'src/auth/enums/user-role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('pieces')
export class PieceController extends CrudController<
  Piece,
  CreatePieceDto,
  UpdatePieceDto
> {
  constructor(private readonly pieceService: PieceService) {
    super(pieceService);
  }

  @Get("provider/:id")
  async getPiecesByProvider(@Param('id') id: number): Promise<Piece[]> {
    return await this.pieceService.getByProviderId(id);
  }
  
  @Roles(UserRoleEnum.PROVIDER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('image', fileUploadOptions),
  )
  async updatePiece(
    @Param('id') id: number,
    @Body() dto: UpdatePieceDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Piece> {
    if (image) {
      dto.image = image.filename;
    }
    
    const c =  await this.pieceService.update(id, dto);
    console.log("piece" , c);
    return c;
  }

  @Roles(UserRoleEnum.PROVIDER)
  @UseGuards(AuthGuard, RolesGuard)
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
  async searchPieces(@Query() query: SearchDto): Promise<returnData> {
    return await this.pieceService.searchPieces(query);

  }

  @Get('search/:id')
  async searchPiecesByCategory(
    @Param('id') id: number,
    @Query() query: SearchDto,
  ): Promise<returnData> {
    return await this.pieceService.searchPiecesByCategory(id, query);
  }
}
