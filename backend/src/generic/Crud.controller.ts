import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CrudService } from "./Crud.Service";

export class CrudController<T ,createDto,UpdateDto>{

	constructor(private readonly service: CrudService<T ,createDto,UpdateDto>) {}
  
  @Get('getall')
  async findAll(): Promise<T[]> {
    return this.service.findAll();
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
    @Delete('/softDelete/:id')
async DeleteTodoByIdv2(@Param('id', ParseIntPipe) id: number){
 return await this.service.DeleteTodoByIdv2(id);
}

@Get('/restore/:id')
async RestoreTodoByIdv2(@Param('id', ParseIntPipe) id: number){
    return await this.service.RestoreTodoByIdv2(id);
}
  }

