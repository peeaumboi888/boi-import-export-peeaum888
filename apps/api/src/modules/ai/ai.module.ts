import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { BoiModule } from '../boi/boi.module';
import { CustomsModule } from '../customs/customs.module';
import { LegalModule } from '../legal/legal.module';
import { MaterialModule } from '../material/material.module';

@Module({
  imports: [
    KnowledgeModule,
    BoiModule,
    CustomsModule,
    LegalModule,
    MaterialModule,
  ],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
