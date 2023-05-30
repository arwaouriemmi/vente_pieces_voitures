import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export abstract class CrudService<T, createDto, UpdateDto> {
  constructor(private readonly repository: Repository<T>) {}

  async getCount(): Promise<number> {
    return await this.repository.count();
  }

  async getCountWithQuery(cond: string, deleted?: boolean): Promise<number> {
    const query = this.repository.createQueryBuilder();
    if (deleted) {
      query.withDeleted();
    }
    query.where(cond);
    return await query.getCount();
  }

  async findAll(page: number = 1, take: number): Promise<T[]> {
    try {
      return this.repository.find({
        skip: ((page - 1) * take) as number,
        take: take,
        loadRelationIds:true
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async findAllWithQuery(
    page: number,
    take: number,
    cond: string,
    deleted?: boolean,
  ): Promise<T[]> {
    try {
      const query = this.repository.createQueryBuilder();
      if (deleted) {
        query.withDeleted();
      }
      query.where(cond);
      query.skip((page - 1) * take);
      query.take(take);
      console.log(query.getSql());
      return await query.getMany();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async create(Dto: createDto): Promise<T> {
    return await this.repository.save(Dto as DeepPartial<T>);
  }

  async findOne(id: number, deleted?: boolean){
    try {
      if (deleted) {
        return await this.repository.findOne({ where: {id : id}, withDeleted: true, loadRelationIds:true });
      }
      return await this.repository.findOne({ where: {id : id}});
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateDto: UpdateDto): Promise<T> {
    const entity = await this.repository.preload({
      id,
      ...(updateDto as DeepPartial<T>),
    });
    return await this.repository.save(entity as DeepPartial<T>);
  }

  async delete(id: number): Promise<void> {
    try {
      this.repository.delete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async softDelete(id: number) {
    return await this.repository.softDelete(id);
  }
  async restore(id: number) {
    return await this.repository.restore(id);
  }
}
