import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async findAllMaterials(boiApplicationId?: string) {
    const where = boiApplicationId ? { boiApplicationId } : {};
    return this.prisma.material.findMany({ where });
  }

  async findOneMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        movements: true,
        balances: true,
      },
    });
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    return material;
  }

  async createMaterial(data: any) {
    return this.prisma.material.create({ data });
  }

  async updateMaterial(id: string, data: any) {
    return this.prisma.material.update({
      where: { id },
      data,
    });
  }

  async createMovement(materialId: string, data: any) {
    return this.prisma.materialMovement.create({
      data: {
        materialId,
        movementType: data.movementType,
        quantity: data.quantity,
        referenceNumber: data.referenceNumber,
        documentDate: data.documentDate,
        remarks: data.remarks,
      },
    });
  }

  async getMovements(materialId: string) {
    return this.prisma.materialMovement.findMany({
      where: { materialId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBalance(materialId: string, period?: string) {
    const where: any = { materialId };
    if (period) {
      where.period = new Date(period);
    }
    return this.prisma.materialBalance.findMany({
      where,
      orderBy: { period: 'desc' },
    });
  }

  async getStatistics() {
    const totalMaterials = await this.prisma.material.count();
    const activeMaterials = await this.prisma.material.count({
      where: { isActive: true },
    });
    return { totalMaterials, activeMaterials };
  }
}
