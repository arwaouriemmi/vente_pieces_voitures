import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { CrudController } from 'src/generic/crud/Crud.controller';
import { Cars } from './entities/cars.entity';
import { CreatecarsDto } from './dto/create-cars.dto';
import { UpdatecarsDto } from './dto/update-cars.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController extends CrudController<
  Cars,
  CreatecarsDto,
  UpdatecarsDto
> {
  constructor(private readonly carsService: CarsService) {
    super(carsService);
  }

  @Get('/brands')
  async getCarsByBrand(): Promise<String[]> {
    return this.carsService.getCarBrands();
  }

  @Get('/models')
  async getCarsByModel(@Query('brand') brand: string): Promise<String[]> {
    return this.carsService.getCarModels(brand);
  }

  @Get('/motorization')
  async getCarsByMotorization(
    @Query('brand') brand: string,
    @Query('model') model: String,
  ): Promise<String[]> {
    return this.carsService.getCarMotorizations(brand, model);
  }

}
