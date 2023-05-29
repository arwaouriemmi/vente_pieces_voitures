import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generic/Crud.Service';
import { Providers } from './entities/providers.entity';
import { UpdateprovidersDto } from './dto/update-providers.dto';
import { CreateprovidersDto } from './dto/create-providers.dto';
import { Repository } from 'typeorm';
import { MailingService } from 'src/mailing/mailing.service';

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
  ) {
    super(ProviderRepository);
  }

  async addProvider(provider: CreateprovidersDto): Promise<Providers> {
    const pro: Providers = await this.ProviderRepository.save(provider);
    this.Mailingservice.sendUserConfirmation(pro);
    return pro;
  }

  async deleteProvider(id: number): Promise<{count: number}> {
    const provider = await this.ProviderRepository.findOneBy({id : id as unknown as string});
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

  async getAllProviders(page: number, take: number): Promise<Providers[]> {
    const skip: number = ((page - 1) * take) as number;
    return await this.ProviderRepository.find({
      withDeleted: true,
      skip: skip,
      take: take,
    });
  }
}
