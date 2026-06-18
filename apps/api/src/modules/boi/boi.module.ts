import { Module } from '@nestjs/common';
import { BoiService } from './boi.service';
import { BoiController } from './boi.controller';

@Module({
  controllers: [BoiController],
  providers: [BoiService],
  exports: [BoiService],
})
export class BoiModule {}
