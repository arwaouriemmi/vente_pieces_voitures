import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { CarsService } from '../cars/cars.service';
import { Piece } from './entities/piece.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { CrudService } from '../generic/crud.Service';
import SearchDto from './dto/search.dto';
import PaginateDto from 'src/generic/crud/dto/paginate.dto';

@Injectable()
export class PieceService extends CrudService<
  Piece,
  CreatePieceDto,
  UpdatePieceDto
> {
  constructor(
    @InjectRepository(Piece)
    private piecesRepository: Repository<Piece>,
    private readonly carService: CarsService,
  ) {
    super(piecesRepository);
  }

  async add(createPieceDto: CreatePieceDto): Promise<Piece> {
    console.log(createPieceDto);
    const cars = await this.carService.getCarsByCriteria(
      createPieceDto.brand,
      createPieceDto.model,
      createPieceDto.motorization,
    );

    const newPiece: any = createPieceDto;
    newPiece.cars = cars;
    console.log(newPiece);
    return await this.piecesRepository.save(newPiece);
  }

  async getByCriteriaQuery(
    data: SearchDto,
    query: SelectQueryBuilder<Piece>,
  ): Promise<SelectQueryBuilder<Piece>> {
    const { brand, model, motorization, sortBy } = data;

    if (brand) {
      query.andWhere('cars.brand = :brand', { brand: brand });
    }

    if (model) {
      query.andWhere('cars.model = :model', { model: model });
    }

    if (motorization) {
      query.andWhere('cars.motorization = :motorization', {
        motorization: motorization,
      });
    }
    switch (sortBy) {
      case 'IncreasingPrice':
        query.orderBy('pieces.price', 'ASC');
        break;
      case 'DecreasingPrice':
        query.orderBy('pieces.price', 'DESC');
        break;
      case 'AdditionDate':
        query.orderBy('pieces.createdAt', 'DESC');
        break;
      default:
        break;
    }
    return query;
  }

  async searchPieces(data: SearchDto): Promise<Piece[]> {
    let query = this.piecesRepository
      .createQueryBuilder('pieces')
      .leftJoinAndSelect('pieces.cars', 'cars');

    query = await this.getByCriteriaQuery(data, query);

    return this.paginate(query, data);
  }

  async getByCategoryQuery(id: number): Promise<SelectQueryBuilder<Piece>> {
    const query = await this.piecesRepository
      .createQueryBuilder('pieces')
      .leftJoinAndSelect('pieces.subCategory', 'subCategory')
      .leftJoinAndSelect('pieces.category', 'category')
      .leftJoinAndSelect('pieces.cars', 'cars')
      .where('subCategory.id = :subCategoryId', { subCategoryId: id })
      .orWhere('category.id = :categoryId', { categoryId: id });
    return query;
  }

  async searchPiecesByCategory(
    id: number,
    dto: PaginateDto | SearchDto,
  ): Promise<Piece[]> {
    let query = await this.getByCategoryQuery(id);

    if (dto instanceof SearchDto) {
      query = await this.getByCriteriaQuery(dto, query);
    }
    return this.paginate(query, dto);
  }
}
