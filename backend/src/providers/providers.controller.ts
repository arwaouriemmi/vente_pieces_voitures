import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('providers')
export class ProvidersController {
  @Get('')
  getProviders(@Param('id') id: string,
  @Param('active') name: string,
  @Param('page') page: number) {
    return [
      {
        id: '1',
        name: 'Provider 1',
        address: 'Address 1',
        city: 'City 1',
        phone: 'Phone 1',
        createdAt: '2021-01-01',
        deletedAt: '2021-01-01',
      },
      {
        id: '2',
        name: 'Provider 2',
        address: 'Address 2',
        city: 'City 2',
        phone: 'Phone 2',
        createdAt: '2021-01-02',
        deletedAt: undefined,
      },
    ];
  }

    @Get(':id')
    getProvider(@Param('id') id: string) {
        return {
            id: '1',
            name: 'Provider 1',
            address: 'Address 1',
            city: 'City 1',
            phone: 'Phone 1',
            createdAt: '2021-01-01',
            deletedAt: '2021-01-01',
        };
    }

  @Post('add')
    createProvider(@Body() provider: any) {
    console.log(provider);
        return provider;
    }

    @Patch('edit/:id')
    updateProvider(@Param('id') id: string, @Body() provider: any) {
        console.log(id, provider);
        return provider;
    }

    @Delete('delete/:id')
    deleteProvider(@Param('id') id: string) {
        console.log(id);
        return {id};
    }
}
