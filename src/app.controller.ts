import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('API')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/leads')
  @ApiOperation({ description: 'getLeads' })
  @ApiResponse({
    status: 200,
    description: 'Get contacts, leads, pipelines, users',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getLeads(): Promise<any> {
    return await this.appService.getLeads()
  }
}
