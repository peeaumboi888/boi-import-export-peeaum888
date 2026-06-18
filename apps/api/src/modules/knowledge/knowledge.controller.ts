import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { KnowledgeService } from './knowledge.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('knowledge')
@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Get('documents')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all documents' })
  async findAllDocuments(
    @Request() req,
    @Query('category') category?: string,
  ) {
    return this.knowledgeService.findAllDocuments(req.user.sub, category);
  }

  @Get('documents/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get document by id' })
  async findOneDocument(@Param('id') id: string) {
    return this.knowledgeService.findOneDocument(id);
  }

  @Post('documents')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create document' })
  async createDocument(@Request() req, @Body() data: any) {
    return this.knowledgeService.createDocument(req.user.sub, data);
  }

  @Delete('documents/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete document' })
  async deleteDocument(@Param('id') id: string) {
    return this.knowledgeService.deleteDocument(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search documents' })
  async searchDocuments(
    @Query('q') query: string,
    @Query('userId') userId?: string,
  ) {
    return this.knowledgeService.searchDocuments(query, userId);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get knowledge base statistics' })
  async getStatistics(@Request() req) {
    return this.knowledgeService.getStatistics(req.user.sub);
  }
}
