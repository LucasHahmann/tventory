import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto, res) {
    try {
      await this.prisma.employee.create({
        data: {
          FirstName: createEmployeeDto.FirstName,
          LastName: createEmployeeDto.LastName,
          EMail: createEmployeeDto.EMail,
          Fullname: `${createEmployeeDto.FirstName} ${createEmployeeDto.LastName}`,
          Building: {
            connect: {
              Name: createEmployeeDto.Buidling,
            },
          },
        },
      });
      return res
        .status(201)
        .json({ status: 201, message: 'Succesfully created Employee' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific known request error
        // This error means, that one relation is noch correct
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

  async findAll(res) {
    try {
      const employees = await this.prisma.employee.findMany();

      return res
        .status(200)
        .json({ message: 'Succesfully queried Employees', data: employees });
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
      const employee = await this.prisma.employee.findUnique({
        where: { id: id },
      });
      if (employee === null)
        return res
          .status(400)
          .json({ message: 'No employee was found!', data: employee });
      return res
        .status(200)
        .json({ message: 'Succesfully queried Employee', data: employee });
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

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto, res) {
    try {
      const employee = await this.prisma.employee.update({
        where: { id: id },
        data: {
          FirstName: updateEmployeeDto.FirstName,
          LastName: updateEmployeeDto.LastName,
          EMail: updateEmployeeDto.EMail,
          Fullname: `${updateEmployeeDto.FirstName} ${updateEmployeeDto.LastName}`,
          Building: {
            connect: {
              Name: updateEmployeeDto.Buidling,
            },
          },
        },
      });
      return res
        .status(200)
        .json({ message: 'Succesfully queried Employee', data: employee });
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
      const employee = await this.prisma.employee.delete({
        where: { id: id },
      });
      return res
        .status(200)
        .json({ message: 'Succesfully removed Employee', data: employee });
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
