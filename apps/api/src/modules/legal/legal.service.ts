import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LegalService {
  constructor(private prisma: PrismaService) {}

  async findAllLaws(search?: string, category?: string) {
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { titleTh: { contains: search } },
      ];
    }
    return this.prisma.law.findMany({ where });
  }

  async findOneLaw(id: string) {
    const law = await this.prisma.law.findUnique({
      where: { id },
      include: { sections: true },
    });
    if (!law) {
      throw new NotFoundException('Law not found');
    }
    return law;
  }

  async findSections(lawId: string) {
    return this.prisma.lawSection.findMany({
      where: { lawId },
      orderBy: { sectionNumber: 'asc' },
    });
  }

  async searchLaws(query: string) {
    return this.prisma.law.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { titleTh: { contains: query } },
          { summary: { contains: query } },
          { fullText: { contains: query } },
        ],
      },
    });
  }

  async getStatistics() {
    const total = await this.prisma.law.count();
    const active = await this.prisma.law.count({
      where: { status: 'active' },
    });
    return { total, active };
  }
}
