import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}
  async get(dto) {
    console.log(dto);
    const test = await this.prisma.device.findMany();
    const test2 = await this.prisma.device.create({
      data: {},
    });
  }
}
