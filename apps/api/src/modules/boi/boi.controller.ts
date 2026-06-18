import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BoiService } from './boi.service';
import { CreateBOIApplicationDto } from './dto/create-boi-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('boi')
@Controller('boi')
export class BoiController {
  constructor(private readonly boiService: BoiService) {}

  @Get('privileges')
  @ApiOperation({ summary: 'Get all BOI privileges' })
  async findAllPrivileges(@Query('categoryId') categoryId?: string) {
    return this.boiService.findAllPrivileges(categoryId);
  }

  @Get('privileges/:id')
  @ApiOperation({ summary: 'Get BOI privilege by id' })
  async findOnePrivilege(@Param('id') id: string) {
    return this.boiService.findOnePrivilege(id);
  }

  @Get('applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all BOI applications' })
  async findAllApplications(@Request() req) {
    return this.boiService.findAllApplications(req.user.sub);
  }

  @Post('applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create BOI application' })
  async createApplication(
    @Request() req,
    @Body() dto: CreateBOIApplicationDto,
  ) {
    return this.boiService.createApplication(req.user.sub, dto);
  }

  @Get('applications/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get BOI application by id' })
  async findOneApplication(@Param('id') id: string) {
    return this.boiService.findOneApplication(id);
  }

  @Put('applications/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update BOI application' })
  async updateApplication(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.boiService.updateApplication(id, data);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get BOI statistics' })
  async getStatistics() {
    return this.boiService.getStatistics();
  }
}
