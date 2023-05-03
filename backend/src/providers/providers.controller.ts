import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CrudController } from 'src/generic/Crud.controller';
import { Providers  } from './entities/providers.entity';
import { CreateprovidersDto } from './dto/create-providers.dto';
import { UpdateprovidersDto } from './dto/update-providers.dto';
import { ProvidersService } from './providers.service';

@Controller('providers')
export class ProvidersController extends CrudController<Providers ,CreateprovidersDto,UpdateprovidersDto> {
  constructor(private readonly providerService:ProvidersService){
      super(providerService);
  }

 /* @Get('')
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
    }*/
}
