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

  async findAll(page: number, take: number): Promise<T[]> {
    try {
      return this.repository.find({
        skip: ((page - 1) * take) as number,
        take: take,
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
      return await query.getMany();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async create(Dto: createDto): Promise<T> {
    return await this.repository.save(Dto as DeepPartial<T>);
  }

  async findOne(id: number, deleted?: boolean): Promise<T> {
    let res: T;
    deleted
      ? (res = await this.repository.findOne({
          where: { id: id },
          withDeleted: true,
        }))
      : (res = await this.repository.findOne({where: { id: id }}));

    if (!res) {
      throw new NotFoundException(`Entity with ID ${id} is not found`);
    }
    return res;
  }

  async update(id: number, updateDto: UpdateDto): Promise<T> {
    const entity = await this.repository.preload({
      id,
      ...(updateDto as DeepPartial<T>),
    });
    return await this.repository.save(entity);
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
