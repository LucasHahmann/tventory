import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://device-mnagement:123456@192.168.178.220:5432/device-mangagement?schema=device-mangagement',
        },
      },
    });
  }
}
