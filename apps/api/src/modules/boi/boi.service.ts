import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBOIApplicationDto } from './dto/create-boi-application.dto';

@Injectable()
export class BoiService {
  constructor(private prisma: PrismaService) {}

  async findAllPrivileges(categoryId?: string) {
    const where = categoryId ? { categoryId } : {};
    return this.prisma.bOIPrivilege.findMany({
      where,
      include: { category: true },
    });
  }

  async findOnePrivilege(id: string) {
    const privilege = await this.prisma.bOIPrivilege.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!privilege) {
      throw new NotFoundException('Privilege not found');
    }

    return privilege;
  }

  async findAllApplications(userId: string) {
    return this.prisma.bOIApplication.findMany({
      where: { userId },
      include: {
        privileges: {
          include: { privilege: true },
        },
      },
    });
  }

  async createApplication(userId: string, dto: CreateBOIApplicationDto) {
    return this.prisma.bOIApplication.create({
      data: {
        userId,
        companyName: dto.companyName,
        projectName: dto.projectName,
        activityType: dto.activityType,
        investmentAmount: dto.investmentAmount,
        status: 'pending',
      },
    });
  }

  async findOneApplication(id: string) {
    const application = await this.prisma.bOIApplication.findUnique({
      where: { id },
      include: {
        privileges: {
          include: { privilege: true },
        },
        materials: true,
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async updateApplication(id: string, data: any) {
    return this.prisma.bOIApplication.update({
      where: { id },
      data,
    });
  }

  async getStatistics() {
    const total = await this.prisma.bOIApplication.count();
    const pending = await this.prisma.bOIApplication.count({
      where: { status: 'pending' },
    });
    const approved = await this.prisma.bOIApplication.count({
      where: { status: 'approved' },
    });

    return { total, pending, approved };
  }
}
