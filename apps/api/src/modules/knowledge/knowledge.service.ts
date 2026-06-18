import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  async findAllDocuments(userId: string, category?: string) {
    const where: any = { userId };
    if (category) {
      where.category = category;
    }
    return this.prisma.document.findMany({ where });
  }

  async findOneDocument(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: { chunks: true },
    });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async createDocument(userId: string, data: any) {
    return this.prisma.document.create({
      data: {
        userId,
        title: data.title,
        fileName: data.fileName,
        fileType: data.fileType,
        fileSize: data.fileSize,
        fileUrl: data.fileUrl,
        category: data.category,
        tags: data.tags || [],
        processed: false,
      },
    });
  }

  async deleteDocument(id: string) {
    return this.prisma.document.delete({ where: { id } });
  }

  async searchDocuments(query: string, userId?: string) {
    const where: any = {
      OR: [
        { title: { contains: query } },
        { category: { contains: query } },
        { tags: { has: query } },
      ],
    };
    if (userId) {
      where.userId = userId;
    }
    return this.prisma.document.findMany({ where });
  }

  async getStatistics(userId: string) {
    const total = await this.prisma.document.count({
      where: { userId },
    });
    const processed = await this.prisma.document.count({
      where: { userId, processed: true },
    });
    return { total, processed };
  }
}
