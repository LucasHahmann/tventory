import { Module } from '@nestjs/common';
import { ManufactorService } from './manufactor.service';
import { ManufactorController } from './manufactor.controller';

@Module({
  controllers: [ManufactorController],
  providers: [ManufactorService],
})
export class ManufactorModule {}
