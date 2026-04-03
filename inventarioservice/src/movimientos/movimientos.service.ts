import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly repo: Repository<Movimiento>,
  ) {}

  findAll(): Promise<Movimiento[]> {
    return this.repo.find({ order: { fecha: 'DESC' } });
  }
}
