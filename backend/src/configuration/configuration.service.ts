import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}

  async createInventoryPrefix() {
    await this.prisma.configuration.create({
      data: {
        KeyName: 'InventoryPrefix',
      },
    });
  }

  async setInventoryPrefix(UpdateInventoryPrefix, res) {
    try {
      try {
        // Check if Param exists
        let inventoryPrefix = await this.prisma.configuration.findUnique({
          where: {
            KeyName: 'InventoryPrefix',
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle specific known request error
          if (error.code === 'P2025') {
            console.log('Generate Prefix');
            this.createInventoryPrefix();
          }
        }
      }

      const InventoryPrefix = await this.prisma.configuration.update({
        where: {
          KeyName: 'InventoryPrefix',
        },
        data: {
          KeyValue: UpdateInventoryPrefix.InventoryPrefix,
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'Successfully set Inventory Prefix',
        InventoryPrefix: InventoryPrefix,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        // Handle specific known request error
        if (error.code === 'P2025') {
          this.createInventoryPrefix();
        }
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error);
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        console.log(error);
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  async getInventoryPrefix(res) {
    try {
      const InventoryPrefix = await this.prisma.configuration.findUnique({
        where: {
          KeyName: 'InventoryPrefix',
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'Successfully get Prefix',
        data: InventoryPrefix,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        // Handle specific known request error
        if (error.code === 'P2002')
          return res.status(400).json({
            error: 'Type already exists',
            prismaCode: error.code,
          });
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error);
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        console.log(error);
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }
}
