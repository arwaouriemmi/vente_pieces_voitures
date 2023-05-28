import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class CategoriesController {
  @Get('categories')
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
  }
}
