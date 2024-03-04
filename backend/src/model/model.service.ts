import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) {}

  async create(createModelDto: CreateModelDto, res) {
    try {
      const newModel = await this.prisma.model.create({
        data: {
          Model: createModelDto.Model,
          Manufactor: {
            connect: {
              Name: createModelDto.Manufactor,
            },
          },
          AssetType: {
            connect: {
              Type: createModelDto.AssetType,
            },
          },
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'Successfully created model',
        data: newModel,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        // Handle specific known request error
        if (error.code === 'P2002')
          return res.status(400).json({
            error: 'Manfucator already exists',
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
      const models = await this.prisma.model.findMany();

      return res
        .status(200)
        .json({ message: 'Succesfully queried models', data: models });
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

  async getAllByManufactor(manufactor: string, res) {
    try {
      const model = await this.prisma.model.findMany({
        where: { ManufactorName: manufactor },
      });
      if (model === null)
        return res
          .status(400)
          .json({ message: 'No model was found!', data: model });
      return res.status(200).json({
        message: 'Succesfully queried manufactor models!',
        data: model,
      });
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
      const model = await this.prisma.model.findUnique({
        where: { id: id },
      });
      if (model === null)
        return res
          .status(400)
          .json({ message: 'No model was found!', data: model });
      return res
        .status(200)
        .json({ message: 'Succesfully queried model', data: model });
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

  async update(id: number, updateModelDto: UpdateModelDto, res) {
    try {
      const assetType = await this.prisma.assetType.update({
        where: { id: id },
        data: {},
      });
      return res
        .status(200)
        .json({ message: 'Succesfully updatet model', data: assetType });
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

  async remove(id: number, res) {
    try {
      const model = await this.prisma.model.delete({
        where: { id: id },
      });
      return res
        .status(200)
        .json({ message: 'Succesfully removed model', data: model });
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
