import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { RolTrabajador } from '../entities/trabajador.entity';

export class CreateTrabajadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsEnum(RolTrabajador)
  @IsOptional()
  rol?: RolTrabajador;

  @IsString()
  @MinLength(6)
  password: string;
}
