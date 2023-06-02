import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { CrudController } from '../generic/crud/crud.controller';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, fileUploadOptions } from '../editFileName';
import { diskStorage } from 'multer';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../auth/enums/user-role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('categories')
export class CategoriesController extends CrudController<
  Categories,
  CreateCategoriesDto,
  UpdateCategoriesDto
> {
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @Roles(UserRoleEnum.PROVIDER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
  @Get('subcategories/:id')
  async getSubCategories(@Param('id') id: number) {
    return this.categoriesService.getSubCategories(id);
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('image', fileUploadOptions),
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

  @Patch('update/:id')
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
    @Body() dto: UpdateCategoriesDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Categories> {
    if (image) {
      dto.image = image.filename;
    }
    
    const c =  await this.categoriesService.update(id, dto);
    return c;
  }

}
