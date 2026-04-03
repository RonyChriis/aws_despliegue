import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { AuthModule } from './auth/auth.module';
import { Trabajador } from './trabajadores/entities/trabajador.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        entities: [Trabajador],
        synchronize: false,
      }),
    }),
    TrabajadoresModule,
    AuthModule,
  ],
})
export class AppModule {}
