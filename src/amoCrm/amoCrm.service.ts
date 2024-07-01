import { Injectable } from '@nestjs/common'
import { Client } from 'amocrm-js'

@Injectable()
export class AmoCrmService {
  private client: Client

  constructor() {
    this.client = new Client({
      domain: 'rootr',
      auth: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: process.env.CODE,
        bearer: process.env.BEARER,
      },
    })
  }

  async getClient(type: string, url: string): Promise<any> {
    return await this.client.request.make(type, url)
  }
}
