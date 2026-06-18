import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chat with AI assistant' })
  async chat(
    @Request() req,
    @Body() body: { agentType: string; message: string },
  ) {
    return this.aiService.chat(body.agentType, body.message, req.user.sub);
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all chat sessions' })
  async getSessions(@Request() req) {
    return this.aiService.getSessions(req.user.sub);
  }

  @Get('sessions/:id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get session messages' })
  async getSessionMessages(@Param('id') id: string) {
    return this.aiService.getSessionMessages(id);
  }
}
