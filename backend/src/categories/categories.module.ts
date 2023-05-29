import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { Categories } from './entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { FileUploadService } from 'src/generic/upload/FileUpload.service';


@Module({
  imports:[TypeOrmModule.forFeature(
    [Categories]
    )],
  controllers: [CategoriesController],
  providers: [CategoriesService,FileUploadService],
  exports:[CategoriesService]
})
export class CategoriesModule {}
