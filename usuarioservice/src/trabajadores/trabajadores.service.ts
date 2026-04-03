import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Trabajador } from './entities/trabajador.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';

@Injectable()
export class TrabajadoresService {
  constructor(
    @InjectRepository(Trabajador)
    private readonly repo: Repository<Trabajador>,
  ) {}

  async create(dto: CreateTrabajadorDto): Promise<Omit<Trabajador, 'password'>> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const trabajador = this.repo.create({ ...dto, password: hashed });
    const guardado = await this.repo.save(trabajador);
    const { password, ...resultado } = guardado;
    return resultado;
  }

  findAll(): Promise<Trabajador[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Trabajador> {
    const trabajador = await this.repo.findOneBy({ id });
    if (!trabajador) throw new NotFoundException(`Trabajador con id ${id} no encontrado`);
    return trabajador;
  }

  async findByEmail(email: string): Promise<Trabajador | null> {
    return this.repo
      .createQueryBuilder('t')
      .addSelect('t.password')
      .where('t.email = :email', { email })
      .getOne();
  }
}
