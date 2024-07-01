import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AmoCrmModule } from './amoCrm/amoCrm.module'

@Module({
  imports: [AmoCrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
