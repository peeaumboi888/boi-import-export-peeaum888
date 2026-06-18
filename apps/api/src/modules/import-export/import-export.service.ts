import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImportExportService {
  constructor(private prisma: PrismaService) {}

  async findAllTransactions(userId: string, type?: string) {
    const where: any = { userId };
    if (type) {
      where.transactionType = type;
    }
    return this.prisma.iETransaction.findMany({
      where,
      include: { items: true },
    });
  }

  async findOneTransaction(id: string) {
    const transaction = await this.prisma.iETransaction.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async createTransaction(userId: string, data: any) {
    return this.prisma.iETransaction.create({
      data: {
        userId,
        transactionType: data.transactionType,
        boiApplicationId: data.boiApplicationId,
        invoiceNumber: data.invoiceNumber,
        invoiceDate: data.invoiceDate,
        totalValue: data.totalValue,
        currency: data.currency || 'THB',
        status: 'pending',
      },
    });
  }

  async updateTransaction(id: string, data: any) {
    return this.prisma.iETransaction.update({
      where: { id },
      data,
    });
  }

  async createItem(transactionId: string, data: any) {
    return this.prisma.iEItem.create({
      data: {
        transactionId,
        productName: data.productName,
        hsCode: data.hsCode,
        quantity: data.quantity,
        unit: data.unit,
        unitPrice: data.unitPrice,
        totalPrice: data.totalPrice,
        countryOfOrigin: data.countryOfOrigin,
        materialType: data.materialType,
        rmtsId: data.rmtsId,
      },
    });
  }

  async getStatistics(userId: string) {
    const imports = await this.prisma.iETransaction.count({
      where: { userId, transactionType: 'import' },
    });
    const exports = await this.prisma.iETransaction.count({
      where: { userId, transactionType: 'export' },
    });

    return { imports, exports };
  }
}
