import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class BuildingService {
  constructor(private prisma: PrismaService) {}

  async create(createBuildingDto: CreateBuildingDto, res) {
    try {
      let building = await this.prisma.building.create({
        data: {
          Name: createBuildingDto.Name,
        },
      });
      return res.status(201).json({
        message: 'Successfully create building',
        data: building,
        status: '201',
      });
    } catch (error) {
      console.log('Error');
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

  async findAll(res) {
    try {
      let buildings = await this.prisma.building.findMany({});
      return res.status(200).json({
        message: 'Successfully find all buildings',
        data: buildings,
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
      let building = await this.prisma.building.findUnique({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully find building', data: building });
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

  async update(id: number, updateBuildingDto: UpdateBuildingDto, res) {
    try {
      let building = await this.prisma.building.update({
        where: {
          id: id,
        },
        data: {
          Name: updateBuildingDto.Name,
        },
      });
      return res.status(200).json({
        message: 'Successfully update building',
        data: building,
        status: 200,
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

  async remove(id: number, res) {
    try {
      let building = await this.prisma.building.delete({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({
          message: 'Successfully deleted building',
          data: building,
          status: 200,
        });
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
