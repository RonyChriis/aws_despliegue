import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ProductosModule } from './productos/productos.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { Producto } from './productos/entities/producto.entity';
import { Movimiento } from './movimientos/entities/movimiento.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST')!,
        port: parseInt(config.get('DB_PORT')!),
        username: config.get('DB_USER')!,
        password: config.get('DB_PASS')!,
        database: config.get('DB_NAME')!,
        entities: [Producto, Movimiento],
        synchronize: false,
      }),
    }),
    ProductosModule,
    MovimientosModule,
  ],
})
export class AppModule {}
