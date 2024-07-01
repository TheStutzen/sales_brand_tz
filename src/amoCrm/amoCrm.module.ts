import { Module } from '@nestjs/common'
import { AmoCrmService } from './amoCrm.service'

@Module({
  providers: [AmoCrmService],
  exports: [AmoCrmService],
})
export class AmoCrmModule {}
