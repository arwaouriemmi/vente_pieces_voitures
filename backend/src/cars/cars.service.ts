import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generic/Crud.Service';
import { Repository } from 'typeorm';
import { Cars } from './entities/cars.entity';
import { CreatecarsDto } from './dto/create-cars.dto';
import { UpdatecarsDto } from './dto/update-cars.dto';

@Injectable()
export class CarsService extends CrudService<Cars,CreatecarsDto,UpdatecarsDto> {
   
    constructor(@InjectRepository(Cars)
          private carRepository:Repository<Cars>){
        super(carRepository);
    }
    async getCarsByBrand(brand: string): Promise<Cars[]> {
        return this.carRepository.find({ where: { brand } });
      }
    
      async getCarsByModel(model: string): Promise<Cars[]> {
        return this.carRepository.find({ where: { model } });
      }
    
      async getCarsByMotorization(motorization: string): Promise<Cars[]> {
        return this.carRepository.find({ where: { motorization } });
      }
      async getCarsByCriteria(
        brand: string,
        model: string,
        motorization: string,
      ): Promise<Cars[]> {
        const queryBuilder = this.carRepository.createQueryBuilder('car');
    
        if (brand) {
          queryBuilder.andWhere('car.brand = :brand', { brand });
        }
    
        if (model) {
          queryBuilder.andWhere('car.model = :model', { model });
        }
    
        if (motorization) {
          queryBuilder.andWhere('car.motorization = :motorization', {
            motorization,
          });
        }
    
        return queryBuilder.getMany();
      }
      async getCarMotorization(brand: string, model: string): Promise<Cars[]> {
        return await this.carRepository
          .createQueryBuilder('car')
          .where('car.brand = :brand', { brand })
          .andWhere('car.model = :model', { model })
          .select(['car.motorization'])
          .getMany();
      }
}
