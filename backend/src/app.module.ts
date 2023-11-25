import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { BuildingModule } from './building/building.module';
import { AssetModule } from './asset/asset.module';
import { ManufactorModule } from './manufactor/manufactor.module';
import { ModelModule } from './model/model.module';
import { AssetTypeModule } from './asset-type/asset-type.module';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
