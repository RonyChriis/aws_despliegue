import {
  Controller, Get, Post, Put, Body, Param,
  ParseIntPipe, UseGuards, Req,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('api')
@UseGuards(JwtGuard, RolesGuard)
export class GatewayController {
  constructor(private readonly service: GatewayService) {}

  // ── TRABAJADORES ────────────────────────────────────────────
  @Post('trabajadores')
  @Roles('admin')
  crearTrabajador(@Body() body: any) {
    return this.service.crearTrabajador(body);
  }

  @Get('trabajadores')
  @Roles('admin', 'worker')
  getTrabajadores() {
    return this.service.getTrabajadores();
  }

  @Get('trabajadores/:id')
  @Roles('admin', 'worker')
  getTrabajador(@Param('id', ParseIntPipe) id: number) {
    return this.service.getTrabajador(id);
  }

  // ── PRODUCTOS ────────────────────────────────────────────────
  @Post('productos')
  @Roles('admin', 'worker')
  crearProducto(@Body() body: any, @Req() req: any) {
    if (req.user) body.trabajadorId = req.user.sub;
    return this.service.crearProducto(body);
  }

  @Put('productos/:id/stock')
  @Roles('admin')
  actualizarStock(@Param('id', ParseIntPipe) id: number, @Body() body: any, @Req() req: any) {
    if (req.user) body.trabajadorId = req.user.sub;
    return this.service.actualizarStock(id, body);
  }

  @Get('productos')
  @Roles('admin', 'worker')
  getProductos() {
    return this.service.getProductos();
  }

  // ── REPORTES ─────────────────────────────────────────────────
  @Get('reportes/movimientos')
  @Roles('admin', 'worker')
  getReporteMovimientos() {
    return this.service.getReporteMovimientos();
  }
}
