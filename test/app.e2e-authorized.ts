import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AmoCrmModule } from '../src/amoCrm/amoCrm.module'
import { ConfigModule } from '@nestjs/config'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let agent: request.SuperAgentTest

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        AmoCrmModule,
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
    }).compile()

    app = moduleFixture.createNestApplication<NestExpressApplication>()
    await app.init()

    agent = request(
      app.getHttpServer(),
    ) as unknown as request.SuperTest<request.Test>
  })

  afterAll(async () => {
    await app.close()
  })

  it('Get Leads', async () => {
    return await agent.get('/api/leads').expect(200)
  })
})
