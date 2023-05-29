import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { CrudController } from 'src/generic/crud/Crud.controller';
import { CategoriesService } from './categories.service';
import { FileUploadService } from 'src/generic/upload/FileUpload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController extends CrudController<
  Categories,
  CreateCategoriesDto,
  UpdateCategoriesDto
> {
  constructor(private readonly categoriesService: CategoriesService,private readonly fileUplaodService:FileUploadService) {
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
  async getCategoryByLabel(@Param('label')label:string):Promise<Categories>{
    return this.categoriesService.getCategoryByLabel(label);
  }
  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async add(@Body() createCategoryDto:CreateCategoriesDto,@UploadedFile()image:Express.Multer.File):Promise<Categories>{
    await this.fileUplaodService.uploadFile(image);
    return this.categoriesService.create(createCategoryDto);  
  }


  /*@Get('categories')
  getAllCategories() {
    return [
      {
        label: 'test 1',
        id: Math.floor(Math.random() * 100),
        image: undefined,
        parent: undefined,
      },
      {
        label: 'test 2',
        id: Math.floor(Math.random() * 10),
        image: undefined,
        parent: undefined,
      },
    ];
  }
  
  @Get('subcategories/:id')
  getSubCategories(@Param('id') id: number) {
    return [
      {
        label: 'test 1',
        id: Math.floor(Math.random() * 100),
        parent: 110,
        image: undefined,
      },
      {
        label: 'test 2',
        id: Math.floor(Math.random() * 10),
        parent: 110,
        image: undefined,
      },
    ];
  }

  @Get('categories/:id?')
  getCategories(@Param('id') id?: number) {
    if (id !== undefined) {
      const result = {
        label: 'test 1',
        id: Math.floor(Math.random() * 100),
        image: undefined,
        parent: 110,
      };
      return result;
    }

    return [
      {
        label: 'test 1',
        id: 110,
        image: undefined,
        parent: undefined,
      },
      {
        label: 'test 2',
        id: 200,
        image: undefined,
        parent: undefined,
      },
    ];
  }*/
}
