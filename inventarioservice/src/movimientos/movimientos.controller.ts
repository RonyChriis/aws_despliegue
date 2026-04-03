import { Controller, Get } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly service: MovimientosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
