import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomsService {
  constructor(private prisma: PrismaService) {}

  async findAllHSCodes(search?: string) {
    const where = search
      ? {
          OR: [
            { code: { contains: search } },
            { description: { contains: search } },
            { descriptionTh: { contains: search } },
          ],
        }
      : {};

    return this.prisma.hSCode.findMany({ where });
  }

  async findOneHSCode(id: string) {
    const hsCode = await this.prisma.hSCode.findUnique({ where: { id } });
    if (!hsCode) {
      throw new NotFoundException('HS Code not found');
    }
    return hsCode;
  }

  async findByCode(code: string) {
    const hsCode = await this.prisma.hSCode.findFirst({ where: { code } });
    if (!hsCode) {
      throw new NotFoundException('HS Code not found');
    }
    return hsCode;
  }

  async findAllFTA() {
    return this.prisma.fTAAgreement.findMany();
  }

  async findOneFTA(id: string) {
    const fta = await this.prisma.fTAAgreement.findUnique({
      where: { id },
      include: { rulesOfOrigin: true },
    });
    if (!fta) {
      throw new NotFoundException('FTA not found');
    }
    return fta;
  }

  async findRulesOfOrigin(ftaId: string, hsCode?: string) {
    const where: any = { ftaId };
    if (hsCode) {
      where.hsCode = hsCode;
    }
    return this.prisma.ruleOfOrigin.findMany({ where });
  }

  async createDeclaration(data: any) {
    return this.prisma.customsDeclaration.create({ data });
  }

  async findDeclarations(userId: string) {
    return this.prisma.customsDeclaration.findMany({
      where: { userId },
      include: { transaction: true, fta: true },
    });
  }
}
