import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getLeads(): string {
    return 'Hello World!'
  }
}
