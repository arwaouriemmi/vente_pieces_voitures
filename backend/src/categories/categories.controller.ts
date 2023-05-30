import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { CrudController } from 'src/generic/crud/Crud.controller';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from 'editFileName';
import { diskStorage } from 'multer';

@Controller('categories')
export class CategoriesController extends CrudController<
  Categories,
  CreateCategoriesDto,
  UpdateCategoriesDto
> {
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
  @Get('subcategories/:id')
  async getSubCategories(@Param('id') id: number) {
    return this.categoriesService.getSubCategories(id);
  }

  @Get(':label')
  async getCategoryByLabel(@Param('label') label: string): Promise<Categories> {
    return this.categoriesService.getCategoryByLabel(label);
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
  async add(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreateCategoriesDto,
  ): Promise<Categories> {
    if (image) {
      console.log(image.filename);
      dto.image = image.filename;
    }
    return this.categoriesService.create(dto);
  }

  @Post('update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../frontend/public',
        filename: editFileName,
      }),
    }),
  )
  async updateCategory(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: UpdateCategoriesDto,
  ): Promise<Categories> {
    if (image) {
      dto.image = image.filename;
    }
    return this.categoriesService.update(id, dto);
  }

}
