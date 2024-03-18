import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DatabaseService implements OnModuleInit {
  async onModuleInit() {
    try {
      await prisma.$connect();
      console.log('Database connected!');
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
      throw new Error('Failed to connect to database!');
    } finally {
      await prisma.$disconnect();
    }
  }
}
