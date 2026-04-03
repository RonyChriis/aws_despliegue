import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TrabajadoresService } from '../trabajadores/trabajadores.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly trabajadoresService: TrabajadoresService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const trabajador = await this.trabajadoresService.findByEmail(dto.email);

    if (!trabajador) throw new UnauthorizedException('Credenciales inválidas');

    const passwordValido = await bcrypt.compare(dto.password, trabajador.password);
    if (!passwordValido) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: trabajador.id,
      email: trabajador.email,
      rol: trabajador.rol,
      nombre: trabajador.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      trabajador: {
        id: trabajador.id,
        nombre: trabajador.nombre,
        apellido: trabajador.apellido,
        email: trabajador.email,
        rol: trabajador.rol,
      },
    };
  }
}
