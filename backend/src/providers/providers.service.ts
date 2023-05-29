import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generic/crud/Crud.Service';
import { Providers } from './entities/providers.entity';
import { UpdateprovidersDto } from './dto/update-providers.dto';
import { CreateprovidersDto } from './dto/create-providers.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService extends CrudService<
  Providers,
  CreateprovidersDto,
  UpdateprovidersDto
> {
  constructor(
    @InjectRepository(Providers)
    private ProviderRepository: Repository<Providers>,
  ) {
    super(ProviderRepository);
  }
}
