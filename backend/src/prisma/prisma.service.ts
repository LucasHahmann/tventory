import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          //url: 'postgresql://device-mnagement:123456@192.168.178.220:5432/device-mangagement?schema=device-mangagement',
          url: config.get('POSTGRES_STRING'),
        },
      },
    });
  }
}
