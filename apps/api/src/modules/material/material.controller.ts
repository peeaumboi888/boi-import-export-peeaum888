import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MaterialService } from './material.service';

@ApiTags('material')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  async findAll(@Query('boiApplicationId') boiApplicationId?: string) {
    return this.materialService.findAllMaterials(boiApplicationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get material by id' })
  async findOne(@Param('id') id: string) {
    return this.materialService.findOneMaterial(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create material' })
  async create(@Body() data: any) {
    return this.materialService.createMaterial(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update material' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.materialService.updateMaterial(id, data);
  }

  @Post(':id/movements')
  @ApiOperation({ summary: 'Create material movement' })
  async createMovement(@Param('id') id: string, @Body() data: any) {
    return this.materialService.createMovement(id, data);
  }

  @Get(':id/movements')
  @ApiOperation({ summary: 'Get material movements' })
  async getMovements(@Param('id') id: string) {
    return this.materialService.getMovements(id);
  }

  @Get(':id/balance')
  @ApiOperation({ summary: 'Get material balance' })
  async getBalance(
    @Param('id') id: string,
    @Query('period') period?: string,
  ) {
    return this.materialService.getBalance(id, period);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get material statistics' })
  async getStatistics() {
    return this.materialService.getStatistics();
  }
}
