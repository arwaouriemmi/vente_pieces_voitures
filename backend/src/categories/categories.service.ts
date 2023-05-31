import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrudService } from "../generic/crud.Service";
import { Categories } from "./entities/categories.entity";
import { Repository } from "typeorm";
import { CreateCategoriesDto } from "./dto/create-categories.dto";
import { UpdateCategoriesDto } from "./dto/update-categories.dto";

@Injectable()
export class CategoriesService extends CrudService<Categories, CreateCategoriesDto, UpdateCategoriesDto> {

    constructor(@InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>) {
        super(categoriesRepository);
    }
    async getAllCategories() {
        const categories = await this.categoriesRepository
            .createQueryBuilder('categories')
            .where('categories.parent = :parentValue', { parentValue: -1 })
            .getMany();
        return categories;
    }
    async getSubCategories(id: number) {
        const subCategories = await this.categoriesRepository
            .createQueryBuilder('categories')
            .where('categories.parent = :parentId', { parentId: id })
            .getMany();

        return subCategories;
    }
    async getCategoryByLabel(label:string):Promise<Categories>{
        const category = await this.categoriesRepository
        .createQueryBuilder('categories')
        .where('categories.label = :label', { label })
        .getOne();

      return category;
    }
    }

