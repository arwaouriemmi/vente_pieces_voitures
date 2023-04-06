import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('')
export class CarsController {
    @Get('cars')
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

    @Get('cars/brands')
    getBrands() {
        return ['test 1', 'test 2'];
    }

    @Get('cars/models')
    getModels(@Query('brand') brand: string) {
        return ['test 1', 'test 2'];
    }

    @Get('cars/:id')
    getCar(@Param('id') id: string) {
        return {
            id: Math.floor(Math.random() * 100),
            brand: 'test 1',
            model: 'test 1',
            motorization: 'test 1',
            createdAt: new Date().toISOString(),
        };
    }

    @Post('cars/add')
    addCar(@Body() car: any) {
        console.log(car);
    }

    @Patch('cars/edit/:id')
    updateCar(@Body() car: any) {
        console.log(car);
    }

    @Delete('cars/delete/:id')
    deleteCar(@Param('id') id: string) {
        console.log(id);
    }

}
