import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { BuildingModule } from './building/building.module';
import { AssetModule } from './asset/asset.module';
import { ManufactorModule } from './manufactor/manufactor.module';
import { ModelModule } from './model/model.module';
import { AssetTypeModule } from './asset-type/asset-type.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeeModule,
    BuildingModule,
    AssetModule,
    ManufactorModule,
    ModelModule,
    AssetTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
