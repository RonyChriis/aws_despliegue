import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  private get usuarioUrl() { return this.config.get('USUARIO_SERVICE_URL'); }
  private get inventarioUrl() { return this.config.get('INVENTARIO_SERVICE_URL'); }
  private get reporteUrl() { return this.config.get('REPORTE_SERVICE_URL'); }

  // ─── TRABAJADORES ───────────────────────────────────────────
  async crearTrabajador(body: any) {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.usuarioUrl}/trabajadores`, body)
    );
    return data;
  }

  async getTrabajadores() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.usuarioUrl}/trabajadores`)
    );
    return data;
  }

  async getTrabajador(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.usuarioUrl}/trabajadores/${id}`)
    );
    return data;
  }

  // ─── PRODUCTOS ──────────────────────────────────────────────
  async crearProducto(body: any) {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.inventarioUrl}/productos`, body)
    );
    return data;
  }

  async actualizarStock(id: number, body: any) {
    const { data } = await firstValueFrom(
      this.httpService.put(`${this.inventarioUrl}/productos/${id}/stock`, body)
    );
    return data;
  }

  async getProductos() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.inventarioUrl}/productos`)
    );
    return data;
  }

  // ─── REPORTES ───────────────────────────────────────────────
  async getReporteMovimientos() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.reporteUrl}/reportes/movimientos`)
    );
    return data;
  }
}
