import { Injectable } from '@nestjs/common';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { CarsService } from 'src/cars/cars.service';
import { Piece } from './entities/piece.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/generic/crud/Crud.Service';
import { CategoriesService } from 'src/categories/categories.service';
import { FileUploadService } from 'src/generic/upload/FileUpload.service';

@Injectable()
export class PieceService extends CrudService<
  Piece,
  CreatePieceDto,
  UpdatePieceDto
> {

  constructor(@InjectRepository(Piece)
  private piecesRepository: Repository<Piece>, private readonly carService: CarsService, private readonly categoryService: CategoriesService, private readonly fileUploadService: FileUploadService) {
    super(piecesRepository);
  }

  async create(createPieceDto: CreatePieceDto): Promise<Piece> {
    const cars = await this.carService.getCarsByCriteria(createPieceDto.brand, createPieceDto.model, createPieceDto.motorization);
    const category = await this.categoryService.getCategoryByLabel(createPieceDto.category);
    const subCategory = await this.categoryService.getCategoryByLabel(createPieceDto.subcategory);
    return await this.piecesRepository.save({
      pieceCategory: category,
      pieceSubCategory: subCategory,
      cars,
      ...createPieceDto
    })
  }
  
  async searchPieces(brand: string, model: string, motorization: string, sortBy: string): Promise<Piece[]> {
    const query = this.piecesRepository.createQueryBuilder('pieces')
    .innerJoin('pieces.cars', 'cars');
  
  if (brand) {
    query.andWhere('cars.brand = :brand', { brand: brand });
  }
  
  if (model) {
    query.andWhere('cars.model = :model', { model: model });
  }
  
  if (motorization) {
    query.andWhere('cars.motorization = :motorization', { motorization: motorization });
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

    const results = await query.getMany();

    return results;
  }


}









 

