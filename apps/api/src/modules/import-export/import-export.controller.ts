import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ImportExportService } from './import-export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('import-export')
@Controller('import-export')
export class ImportExportController {
  constructor(private readonly importExportService: ImportExportService) {}

  @Get('transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all transactions' })
  async findAll(@Request() req, @Query('type') type?: string) {
    return this.importExportService.findAllTransactions(req.user.sub, type);
  }

  @Get('transactions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction by id' })
  async findOne(@Param('id') id: string) {
    return this.importExportService.findOneTransaction(id);
  }

  @Post('transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create transaction' })
  async create(@Request() req, @Body() data: any) {
    return this.importExportService.createTransaction(req.user.sub, data);
  }

  @Put('transactions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update transaction' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.importExportService.updateTransaction(id, data);
  }

  @Post('transactions/:id/items')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create transaction item' })
  async createItem(@Param('id') id: string, @Body() data: any) {
    return this.importExportService.createItem(id, data);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get import/export statistics' })
  async getStatistics(@Request() req) {
    return this.importExportService.getStatistics(req.user.sub);
  }
}
