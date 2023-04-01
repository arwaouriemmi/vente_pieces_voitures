import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("admin/subcategories/:id")
  getSubCategories(@Param("id") id : number) {
    return [
      {
        label: "test 1",
        id: Math.floor(Math.random() * 100),
        parent: 110,
        image: undefined
      },
      {
        label: "test 2",
        id: Math.floor(Math.random() * 10),
        parent: 110,
        image: undefined
      },
    ]
  }

  @Get("admin/categories/:id?")
  getCategories(@Param("id") id? : number) {
    if (id !== undefined){
      const result = {
          label: "test 1",
          id: Math.floor(Math.random() * 100),
          image: undefined,
          parent: 110
        }
      return result
      }
        
    return [
      {
        label: "test 1",
        id: 110,
        image: undefined,
        parent: undefined
      },
      {
        label: "test 2",
        id: 200,
        image: undefined,
        parent: undefined
      },
    ]
  } 
}

