import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './entities/piece.entity';

@Module({
  imports:[TypeOrmModule.forFeature(
    [Piece]
    )],
  controllers: [PieceController],
  providers: [PieceService]
})
export class PieceModule {}
