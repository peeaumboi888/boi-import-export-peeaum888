import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LegalService } from './legal.service';

@ApiTags('legal')
@Controller('legal')
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @Get('laws')
  @ApiOperation({ summary: 'Get all laws' })
  async findAllLaws(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.legalService.findAllLaws(search, category);
  }

  @Get('laws/:id')
  @ApiOperation({ summary: 'Get law by id' })
  async findOneLaw(@Param('id') id: string) {
    return this.legalService.findOneLaw(id);
  }

  @Get('laws/:id/sections')
  @ApiOperation({ summary: 'Get law sections' })
  async findSections(@Param('id') id: string) {
    return this.legalService.findSections(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search laws' })
  async searchLaws(@Query('q') query: string) {
    return this.legalService.searchLaws(query);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get legal statistics' })
  async getStatistics() {
    return this.legalService.getStatistics();
  }
}
