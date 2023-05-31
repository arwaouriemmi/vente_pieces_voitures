import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../generic/crud.Service';
import { Providers } from './entities/providers.entity';
import { UpdateprovidersDto } from './dto/update-providers.dto';
import { CreateprovidersDto } from './dto/create-providers.dto';
import { Repository } from 'typeorm';
import { MailingService } from '../mailing/mailing.service';
import { AuthService } from '../auth/auth.service';
import PaginateDto from '../generic/crud/dto/paginate.dto';

@Injectable()
export class ProvidersService extends CrudService<
  Providers,
  CreateprovidersDto,
  UpdateprovidersDto
> {
  
  constructor(
    @InjectRepository(Providers)
    private ProviderRepository: Repository<Providers>,
    private Mailingservice: MailingService,
    private AuthService: AuthService,
  ) {
    super(ProviderRepository);
  }

  async addProvider(provider: CreateprovidersDto): Promise<Providers> {
    const pro: Providers = await this.ProviderRepository.save(provider);
    const token = await this.AuthService.createUser(pro.id as unknown as number, pro.email)
    this.Mailingservice.sendUserConfirmation(pro, token);
    return pro;
  }

  async deleteProvider(id: number): Promise<{count: number}> {
    const provider = await this.ProviderRepository.findOne({where: {id: id}});
    this.Mailingservice.sendUserDeactivation(provider);
    await this.ProviderRepository.softDelete(id);
    return {count : 1}
  }

  async restoreProvider(id: number): Promise<Providers> {
      const i = id as unknown as string;
      const provider = await this.ProviderRepository.findOne({where: {id: i}, withDeleted: true});
      await this.ProviderRepository.restore(id);
      this.Mailingservice.sendUserConfirmation(provider);
      return provider;
  }

  async countAllProviders(): Promise<number> {
    return await this.ProviderRepository.count({withDeleted: true});
  }

  async getAllProviders(query : PaginateDto): Promise<Providers[]> {
    const { page, take } = query;
    const skip: number = ((page - 1) * take) as number;
    return await this.ProviderRepository.find({
      withDeleted: true,
      skip: skip,
      take: take,
    });
  }
}
