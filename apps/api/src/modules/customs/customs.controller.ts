import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomsService } from './customs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('customs')
@Controller('customs')
export class CustomsController {
  constructor(private readonly customsService: CustomsService) {}

  @Get('hs-codes')
  @ApiOperation({ summary: 'Get all HS codes' })
  async findAllHSCodes(@Query('search') search?: string) {
    return this.customsService.findAllHSCodes(search);
  }

  @Get('hs-codes/:id')
  @ApiOperation({ summary: 'Get HS code by id' })
  async findOneHSCode(@Param('id') id: string) {
    return this.customsService.findOneHSCode(id);
  }

  @Get('hs-codes/code/:code')
  @ApiOperation({ summary: 'Get HS code by code' })
  async findByCode(@Param('code') code: string) {
    return this.customsService.findByCode(code);
  }

  @Get('fta')
  @ApiOperation({ summary: 'Get all FTA agreements' })
  async findAllFTA() {
    return this.customsService.findAllFTA();
  }

  @Get('fta/:id')
  @ApiOperation({ summary: 'Get FTA by id' })
  async findOneFTA(@Param('id') id: string) {
    return this.customsService.findOneFTA(id);
  }

  @Get('fta/:id/rules')
  @ApiOperation({ summary: 'Get rules of origin for FTA' })
  async findRulesOfOrigin(
    @Param('id') id: string,
    @Query('hsCode') hsCode?: string,
  ) {
    return this.customsService.findRulesOfOrigin(id, hsCode);
  }

  @Get('declarations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all customs declarations' })
  async findDeclarations(@Request() req) {
    return this.customsService.findDeclarations(req.user.sub);
  }

  @Post('declarations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create customs declaration' })
  async createDeclaration(@Request() req, @Body() data: any) {
    return this.customsService.createDeclaration({
      ...data,
      userId: req.user.sub,
    });
  }
}
