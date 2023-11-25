import { Test, TestingModule } from '@nestjs/testing';
import { ManufactorController } from './manufactor.controller';
import { ManufactorService } from './manufactor.service';

describe('ManufactorController', () => {
  let controller: ManufactorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufactorController],
      providers: [ManufactorService],
    }).compile();

    controller = module.get<ManufactorController>(ManufactorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
