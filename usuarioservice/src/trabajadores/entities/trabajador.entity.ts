import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum RolTrabajador {
  ADMIN = 'admin',
  WORKER = 'worker',
}

@Entity('trabajadores')
export class Trabajador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  cargo: string;

  @Column({ type: 'enum', enum: RolTrabajador, default: RolTrabajador.WORKER })
  rol: RolTrabajador;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  creadoEn: Date;
}
