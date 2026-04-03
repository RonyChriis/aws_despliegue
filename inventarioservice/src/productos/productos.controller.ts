import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.service.create(dto);
  }

  @Put(':id/stock')
  updateStock(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStockDto) {
    return this.service.updateStock(id, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
