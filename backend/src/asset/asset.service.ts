import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async create(createAssetDto: CreateAssetDto, res) {
    try {
      const newAsset = await this.prisma.asset.create({
        data: {
          InventoryNumber: createAssetDto.InventoryNumber,
          Employee: {
            connect: {
              id: createAssetDto.Employee,
            },
          },
          Model: {
            connect: {
              Model: createAssetDto.ModelName,
            },
          },
        },
      });
      return res.status(200).json({
        message: 'Successfully created Asset',
        data: newAsset,
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

  async findAll(res) {
    try {
      const assets = await this.prisma.asset.findMany({
        //relationLoadStrategy: 'join',
        include: {
          Employee: true,
          Model: true,
        },
      });

      return res
        .status(200)
        .json({ message: 'Succesfully queried assets', data: assets });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  async findByInventoryNumber(InventoryNumber: string, res) {
    try {
      const asset = await this.prisma.asset.findUnique({
        where: { InventoryNumber: InventoryNumber },
        include: {
          Employee: true,
          Model: true,
        },
      });
      if (asset === null)
        return res
          .status(400)
          .json({ message: 'No asset was found!', data: asset });
      return res
        .status(200)
        .json({ message: 'Succesfully queried asset', data: asset });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  async findOne(id: number, res) {
    try {
      const asset = await this.prisma.asset.findUnique({
        where: { id: id },
      });
      if (asset === null)
        return res
          .status(400)
          .json({ message: 'No asset was found!', data: asset });
      return res
        .status(200)
        .json({ message: 'Succesfully queried asset', data: asset });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  update(id: number, updateAssetDto: UpdateAssetDto, res) {
    return `This action updates a #${id} asset`;
  }

  async remove(id: number, res) {
    try {
      const asset = await this.prisma.asset.delete({
        where: { id: id },
      });
      return res
        .status(200)
        .json({ message: 'Succesfully removed asset', data: asset });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        if (error.code === 'P2025')
          return res.status(400).json({
            error: 'The employee could not be found!',
            prismaCode: error.code,
          });
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }
}
