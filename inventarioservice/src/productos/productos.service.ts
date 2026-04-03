import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Producto } from './entities/producto.entity';
import { Movimiento, TipoMovimiento } from '../movimientos/entities/movimiento.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Movimiento)
    private readonly movimientoRepo: Repository<Movimiento>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  private async validarTrabajador(trabajadorId: number): Promise<void> {
    const usuarioUrl = this.config.get('USUARIO_SERVICE_URL');
    try {
      await firstValueFrom(
        this.httpService.get(`${usuarioUrl}/trabajadores/${trabajadorId}`)
      );
    } catch {
      throw new BadRequestException(`Trabajador con id ${trabajadorId} no existe en usuarioservice`);
    }
  }

  async create(dto: CreateProductoDto): Promise<Producto> {
    await this.validarTrabajador(dto.trabajadorId);

    const producto = this.productoRepo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      stock: dto.stock,
      precio: dto.precio,
    });
    const guardado = await this.productoRepo.save(producto);

    const movimiento = this.movimientoRepo.create({
      productoId: guardado.id,
      productoNombre: guardado.nombre,
      tipo: TipoMovimiento.ENTRADA,
      cantidad: dto.stock,
      trabajadorId: dto.trabajadorId,
    });
    await this.movimientoRepo.save(movimiento);

    return guardado;
  }

  async updateStock(id: number, dto: UpdateStockDto): Promise<Producto> {
    await this.validarTrabajador(dto.trabajadorId);

    const producto = await this.productoRepo.findOneBy({ id });
    if (!producto) throw new NotFoundException(`Producto con id ${id} no encontrado`);

    producto.stock = dto.stock;
    const actualizado = await this.productoRepo.save(producto);

    const movimiento = this.movimientoRepo.create({
      productoId: actualizado.id,
      productoNombre: actualizado.nombre,
      tipo: TipoMovimiento.ACTUALIZACION,
      cantidad: dto.stock,
      trabajadorId: dto.trabajadorId,
    });
    await this.movimientoRepo.save(movimiento);

    return actualizado;
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepo.find();
  }
}
