import { Injectable } from '@nestjs/common';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class AssetTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createAssetTypeDto: CreateAssetTypeDto, res) {
    try {
      const newType = await this.prisma.assetType.create({
        data: {
          Type: createAssetTypeDto.Type,
        },
      });
      return res.status(200).json({
        message: 'Successfully created Type',
        data: newType,
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
      let manufactors = await this.prisma.assetType.findMany({});
      return res.status(200).json({
        message: 'Successfully find all Asset Types',
        data: manufactors,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        if (error.code === 'P2002')
          return res
            .status(400)
            .json({ error: 'Building already exists', prismaCode: error.code });
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        console.log(error);
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  async findOne(id: number, res) {
    try {
      let manufactor = await this.prisma.assetType.findUnique({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully find Asset Type', data: manufactor });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        if (error.code === 'P2002')
          return res
            .status(400)
            .json({ error: 'Building already exists', prismaCode: error.code });
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        console.log(error);
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  async update(id: number, updateAssetTypeDto: UpdateAssetTypeDto, res) {
    try {
      let manufactor = await this.prisma.assetType.update({
        where: {
          id: id,
        },
        data: {
          Type: updateAssetTypeDto.Type,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully update Asset Type', data: manufactor });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        if (error.code === 'P2002')
          return res
            .status(400)
            .json({ error: 'Building already exists', prismaCode: error.code });
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Handle unknown request error
        return res.status(500).json(error);
      } else {
        // Handle other errors
        console.log(error);
        return res.status(500).json({ message: 'Unknwon Reason' });
      }
    }
  }

  async remove(id: number, res) {
    try {
      let manufactor = await this.prisma.assetType.delete({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully deleted Asset Type', data: manufactor });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          return res.status(400).json({
            error: 'The building could not be found!',
            prismaCode: error.code,
          });
        // Handle specific known request error
        if (error.code === 'P2002')
          return res
            .status(400)
            .json({ error: 'Building already exists', prismaCode: error.code });
        if (error.code === 'P2003')
          return res.status(400).json({
            error: 'There are still employees in the building!',
            prismaCode: error.code,
          });
        return res.status(400).json({ prismaCode: error.code });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
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
