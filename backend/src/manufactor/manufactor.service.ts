import { Injectable } from '@nestjs/common';
import { CreateManufactorDto } from './dto/create-manufactor.dto';
import { UpdateManufactorDto } from './dto/update-manufactor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class ManufactorService {
  constructor(private prisma: PrismaService) {}

  async create(createManufactorDto: CreateManufactorDto, res) {
    try {
      const newManufacturer = await this.prisma.manufactor.create({
        data: {
          Name: createManufactorDto.Name,
        },
      });
      return res.status(200).json({
        message: 'Successfully created manfucator',
        data: newManufacturer,
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
      let manufactors = await this.prisma.manufactor.findMany({});
      return res.status(200).json({
        message: 'Successfully find all manufactors',
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
      let manufactor = await this.prisma.manufactor.findUnique({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully find manufactor', data: manufactor });
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

  async update(id: number, updateManufactorDto: UpdateManufactorDto, res) {
    try {
      let manufactor = await this.prisma.manufactor.update({
        where: {
          id: id,
        },
        data: {
          Name: updateManufactorDto.Name,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully update manufactor', data: manufactor });
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
      let manufactor = await this.prisma.manufactor.delete({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: 'Successfully deleted manufactor', data: manufactor });
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
