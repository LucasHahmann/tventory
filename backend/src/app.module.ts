import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [PrismaModule, DeviceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
