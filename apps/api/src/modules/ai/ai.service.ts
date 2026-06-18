import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async chat(agentType: string, message: string, userId: string) {
    // Create or get session
    let session = await this.prisma.chatSession.findFirst({
      where: { userId, agentType },
    });

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: {
          userId,
          agentType,
          title: message.substring(0, 50),
        },
      });
    }

    // Save user message
    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content: message,
      },
    });

    // Generate AI response based on agent type
    const response = await this.generateResponse(agentType, message);

    // Save assistant message
    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: response.answer,
        sources: JSON.stringify(response.sources),
      },
    });

    return {
      sessionId: session.id,
      message: assistantMessage,
      sources: response.sources,
    };
  }

  private async generateResponse(agentType: string, message: string) {
    // TODO: Implement actual OpenAI integration
    // For now, return a placeholder response

    const responses: Record<string, string> = {
      boi: `สำหรับคำถามเกี่ยวกับ BOI: "${message}"\n\nระบบจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบจริงในเวอร์ชันถัดไป`,
      customs: `สำหรับคำถามเกี่ยวกับ Customs: "${message}"\n\nระบบจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบจริงในเวอร์ชันถัดไป`,
      legal: `สำหรับคำถามเกี่ยวกับ Legal: "${message}"\n\nระบบจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบจริงในเวอร์ชันถัดไป`,
      material: `สำหรับคำถามเกี่ยวกับ Material: "${message}"\n\nระบบจะเชื่อมต่อกับ OpenAI API เพื่อให้คำตอบจริงในเวอร์ชันถัดไป`,
    };

    return {
      answer: responses[agentType] || responses.boi,
      sources: [
        {
          title: 'ตัวอย่างเอกสารอ้างอิง',
          content: 'เนื้อหาจากเอกสารอ้างอิง',
          relevance: 0.85,
        },
      ],
    };
  }

  async getSessions(userId: string) {
    return this.prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getSessionMessages(sessionId: string) {
    return this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
