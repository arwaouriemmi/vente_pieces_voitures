import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CrudController } from 'src/generic/crud/Crud.controller';
import { Providers } from './entities/providers.entity';
import { CreateprovidersDto } from './dto/create-providers.dto';
import { UpdateprovidersDto } from './dto/update-providers.dto';
import { ProvidersService } from './providers.service';
import { MailingService } from 'src/mailing/mailing.service';

@Controller('providers')
export class ProvidersController extends CrudController<
  Providers,
  CreateprovidersDto,
  UpdateprovidersDto
> {
  constructor(
    private readonly providerService: ProvidersService,
    private readonly mailingservice: MailingService,
  ) {
    super(providerService);
  }

 
}
