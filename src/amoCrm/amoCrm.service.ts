import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'amocrm-js'

@Injectable()
export class AmoCrmService {
  private client: Client

  constructor(private configService: ConfigService) {
    this.client = new Client({
      domain: 'rootr',
      auth: {
        client_id: this.configService.get<string>('CLIENT_ID'),
        client_secret: this.configService.get<string>('CLIENT_SECRET'),
        redirect_uri: this.configService.get<string>('REDIRECT_URI'),
        code: this.configService.get<string>('CODE'),
        bearer: this.configService.get<string>('BEARER'),
      },
    })
  }

  async getClient(type: string, url: string): Promise<any> {
    return await this.client.request.make(type, url)
  }
}
