import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: 0 })
  stock: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  precio: number;
}
