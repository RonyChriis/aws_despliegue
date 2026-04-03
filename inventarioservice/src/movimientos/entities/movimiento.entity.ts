import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TipoMovimiento {
  ENTRADA = 'ENTRADA',
  ACTUALIZACION = 'ACTUALIZACION',
}

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @Column()
  productoNombre: string;

  @Column({ type: 'enum', enum: TipoMovimiento })
  tipo: TipoMovimiento;

  @Column()
  cantidad: number;

  @Column()
  trabajadorId: number;

  @CreateDateColumn()
  fecha: Date;
}
