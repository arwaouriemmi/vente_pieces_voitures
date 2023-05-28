import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CrudController } from 'src/generic/Crud.controller';
import { Cars } from './entities/cars.entity';
import { CreatecarsDto } from './dto/create-cars.dto';
import { UpdatecarsDto } from './dto/update-cars.dto';
import { CarsService } from './cars.service';

@Controller('/cars')
export class CarsController extends CrudController<Cars ,CreatecarsDto,UpdatecarsDto> {
    constructor(private readonly carsService:CarsService){
        super(carsService);
    }
    
    @Get('/brands/:brand')
  async getCarsByBrand(@Param('brand') brand: string): Promise<Cars[]> {
    return this.carsService.getCarsByBrand(brand);
  }

  @Get('/models/:model')
  async getCarsByModel(@Param('model') model: string): Promise<Cars[]> {
    return this.carsService.getCarsByModel(model);
  }

  @Get('/motorization/:motorization')
  async getCarsByMotorization(@Param('motorization') motorization: string): Promise<Cars[]> {
    return this.carsService.getCarsByMotorization(motorization);
  }
  @Get('/search')
async searchCars(
  @Query('brand') brand: string,
  @Query('model') model: string,
  @Query('motorization') motorization: string,
): Promise<Cars[]> {
  return this.carsService.getCarsByCriteria(brand, model, motorization);
}
@Get('motorization')
  async getCarMotorization(@Query('brand') brand: string, @Query('model') model: string) {
    return this.carsService.getCarMotorization(brand, model);
  }

    /*@Get('')
    getCars() {
        return [
            {
                id: Math.floor(Math.random() * 100),
                brand: 'test 1',
                model: 'test 1',
                motorization: 'test 1',
                createdAt: new Date().toISOString(),
            },
            {
                id: Math.floor(Math.random() * 100),
                brand: 'test 2',
                model: 'test 2',
                motorization: 'test 2',
                createdAt: new Date().toISOString(),
            },
        ];
    }

    @Get('brands')
    getBrands() {
        return ['test 1', 'test 2'];
    }

    @Get('models')
    getModels(@Query('brand') brand: string) {
        return ['test 1', 'test 2'];
    }

    @Get(':id')
    getCar(@Param('id') id: string) {
        return {
            id: Math.floor(Math.random() * 100),
            brand: 'test 1',
            model: 'test 1',
            motorization: 'test 1',
            createdAt: new Date().toISOString(),
        };
    }

    @Get('motorizations')
    getMotorizations(@Query('brand') brand: string, @Query('model') model: string) {
        console.log(brand, model);
        return ['test 1', 'test 2'];
    }

    @Post('add')
    addCar(@Body() car: any) {
        console.log(car);
    }

    @Patch('edit/:id')
    updateCar(@Body() car: any) {
        console.log(car);
    }

    @Delete('delete/:id')
    deleteCar(@Param('id') id: string) {
        console.log(id);
    }
*/
}
