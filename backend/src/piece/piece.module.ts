import { Module } from '@nestjs/common';
import { PieceService } from './piece.service';
import { PieceController } from './piece.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './entities/piece.entity';
import { CarsModule } from 'src/cars/cars.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CarsService } from 'src/cars/cars.service';
import { CategoriesService } from 'src/categories/categories.service';
import { FileUploadService } from 'src/generic/upload/FileUpload.service';
import { Cars } from 'src/cars/entities/cars.entity';
import { Categories } from 'src/categories/entities/categories.entity';

@Module({
  imports:[TypeOrmModule.forFeature(
    [Piece,Cars,Categories]
    ),CarsModule,CategoriesModule],
  controllers: [PieceController],
  providers: [PieceService,CarsService,CategoriesService,FileUploadService],
})
export class PieceModule {}
