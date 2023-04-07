import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('cars')
export class CarsController {
    @Get('')
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

}
