import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TrabajadoresService } from './trabajadores.service';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';

@Controller('trabajadores')
export class TrabajadoresController {
  constructor(private readonly service: TrabajadoresService) {}

  @Post()
  create(@Body() dto: CreateTrabajadorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
