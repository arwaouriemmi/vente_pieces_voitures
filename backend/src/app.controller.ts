import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("admin/cars")
  getCars() {
    return [
      {
        id: Math.floor(Math.random() * 100),
        brand: "test 1",
        model: "test 1",
        motorization: "test 1",
        createdAt: "test 1",
      },
      {
        id: Math.floor(Math.random() * 100),
        brand: "test 2",
        model: "test 2",
        motorization: "test 2",
        createdAt: "test 2",
      },
    ]
  }


}

