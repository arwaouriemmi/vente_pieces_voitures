import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../generic/crud/crud.Service';
import { Providers } from './entities/providers.entity';
import { UpdateprovidersDto } from './dto/update-providers.dto';
import { CreateprovidersDto } from './dto/create-providers.dto';
import { Repository } from 'typeorm';
import { MailingService } from '../mailing/mailing.service';
import { AuthService } from '../auth/auth.service';
import PaginateDto from '../generic/crud/dto/paginate.dto';
import { PieceService } from 'src/piece/piece.service';
import { Piece } from 'src/piece/entities/piece.entity';

@Injectable()
export class ProvidersService extends CrudService<
  Providers,
  CreateprovidersDto,
  UpdateprovidersDto
> {
 
  
  constructor(
    @InjectRepository(Providers)
    private ProviderRepository: Repository<Providers>,
    @InjectRepository(Piece)
    private readonly pieceRepository: Repository<Piece>,
    private Mailingservice: MailingService,
    private AuthService: AuthService
   
  ) {
    super(ProviderRepository);
  }

  async addProvider(provider: CreateprovidersDto): Promise<Providers> {
    const pro: Providers = await this.ProviderRepository.save(provider);
    const token = await this.AuthService.createUser(pro.id as unknown as number, pro.email)
    this.Mailingservice.sendUserConfirmation(pro, token);
    return pro;
  }

  /*async deleteProvider(id: number): Promise<{count: number}> {
    const provider = await this.ProviderRepository.findOne({where: {id: id}});
    await this.AuthService.delete(id);
    this.Mailingservice.sendUserDeactivation(provider);
    await this.ProviderRepository.softDelete(id);
    await this.piecesService.deleteByProviderId(provider.id);
    return {count : 1}
  }*/
  async deleteProvider(id: number): Promise<{ count: number }> {
    const provider = await this.ProviderRepository.findOne({
      where: { id: id },
      relations: ['pieces'], 
      
    });
if (!provider) {
      return { count: 0 };
    }
    for (const piece of provider.pieces) {
      await this.pieceRepository.softDelete(piece.id);
    }
    await this.ProviderRepository.softDelete(id);
   
// Send user deactivation email
    this.Mailingservice.sendUserDeactivation(provider);
    return { count: 1 };
  }

  /*async restoreProvider(id: number): Promise<Providers> {
      const i = id as unknown as string;
      const provider = await this.ProviderRepository.findOne({where: {id: i}, withDeleted: true});
      await this.ProviderRepository.restore(id);
      this.Mailingservice.sendUserConfirmation(provider);
      return provider;
  }*/
  async restoreProvider(id: number): Promise<Providers> {
    const provider = await this.ProviderRepository.findOne({
      where: { id: id },
      withDeleted: true, // Inclure les fournisseurs supprimés
      relations: ['pieces'], // Inclure la relation "pieces"
    });
  if (!provider) {
      // Fournisseur non trouvé
      throw new NotFoundException('Fournisseur introuvable');
    }
  
    // Restaurer le fournisseur
    await this.ProviderRepository.restore(id);
  // Restaurer les pièces associées
    for (const piece of provider.pieces) {
      await this.pieceRepository.restore(piece.id);
    }
  
    // Envoyer l'e-mail de confirmation à l'utilisateur
    this.Mailingservice.sendUserConfirmation(provider);
  
    return provider;
  }

  async countAllProviders(): Promise<number> {
    return await this.ProviderRepository.count({withDeleted: true});
  }

  async getAllProviders(query : PaginateDto): Promise<Providers[]> {
    let { page, take } = query;
    page = page ? page : 1;
    take = take ? take : 6;
    const skip: number = ((page - 1) * take) as number;
    return await this.ProviderRepository.find({
      withDeleted: true,
      skip: skip,
      take: take,
    });
  }
}
