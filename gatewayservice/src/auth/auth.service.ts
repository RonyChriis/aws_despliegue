import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async login(body: any) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.config.get('USUARIO_SERVICE_URL')}/auth/login`,
        body,
      ),
    );
    return data;
  }
}
