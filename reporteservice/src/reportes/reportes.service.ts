import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getMovimientos() {
    const inventarioUrl = this.config.get('INVENTARIO_SERVICE_URL');
    const usuarioUrl = this.config.get('USUARIO_SERVICE_URL');

    // 1. Obtener todos los movimientos de inventarioservice
    const { data: movimientos } = await firstValueFrom(
      this.httpService.get(`${inventarioUrl}/movimientos`)
    );

    // 2. Enriquecer cada movimiento con el nombre del trabajador
    const reportes = await Promise.all(
      movimientos.map(async (mov: any) => {
        try {
          const { data: trabajador } = await firstValueFrom(
            this.httpService.get(`${usuarioUrl}/trabajadores/${mov.trabajadorId}`)
          );
          return {
            id: mov.id,
            producto: mov.productoNombre,
            tipo: mov.tipo,
            cantidad: mov.cantidad,
            fecha: mov.fecha,
            trabajador: `${trabajador.nombre} ${trabajador.apellido}`,
            cargo: trabajador.cargo,
          };
        } catch {
          return {
            id: mov.id,
            producto: mov.productoNombre,
            tipo: mov.tipo,
            cantidad: mov.cantidad,
            fecha: mov.fecha,
            trabajador: `ID ${mov.trabajadorId} (no encontrado)`,
            cargo: '-',
          };
        }
      }),
    );

    return reportes;
  }
}
