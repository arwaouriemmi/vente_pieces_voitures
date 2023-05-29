import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './entities/piece.entity';
import { CarsModule } from 'src/cars/cars.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { Cars } from 'src/cars/entities/cars.entity';
import { Categories } from 'src/categories/entities/categories.entity';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Piece, Cars, Categories]),
    CarsModule,
    CategoriesModule,
    ProvidersModule,
  ],
  controllers: [PieceController],
  providers: [PieceService],
})
export class PieceModule {}
