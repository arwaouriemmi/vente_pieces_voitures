import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CrudService } from "./Crud.Service";

export class CrudController<T ,createDto,UpdateDto>{

	constructor(private readonly service: CrudService<T ,createDto,UpdateDto>) {}
  
  @Get('')
  async findAll(@Query('page') page: number): Promise<T[]> {
    return this.service.findAll(page, 5);
  }
    @Get(':id')
    async findOne(@Param('id',ParseIntPipe) id: number): Promise<T> {
      return this.service.findOne(id);
    }
  
    @Post('add')
    async create(@Body()  Dto :createDto): Promise<T> {
      return this.service.create( Dto);
    }
  
    @Patch('edit/:id')
    async update(@Param('id',ParseIntPipe) id: number, @Body()  Dto:UpdateDto): Promise<T> {
      //async update(@Param('id') id: string, @Body()  Dto:UpdateDto): Promise<T> {
        console.log("done");
      return this.service.update(id, Dto);
    }
  
    @Delete('delete/:id')
    async delete(@Param('id',ParseIntPipe) id: number){
      return this.service.delete(id);
    }
    
  }

