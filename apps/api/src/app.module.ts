import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BoiModule } from './modules/boi/boi.module';
import { CustomsModule } from './modules/customs/customs.module';
import { ImportExportModule } from './modules/import-export/import-export.module';
import { LegalModule } from './modules/legal/legal.module';
import { MaterialModule } from './modules/material/material.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { AiModule } from './modules/ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BoiModule,
    CustomsModule,
    ImportExportModule,
    LegalModule,
    MaterialModule,
    KnowledgeModule,
    AiModule,
  ],
})
export class AppModule {}
