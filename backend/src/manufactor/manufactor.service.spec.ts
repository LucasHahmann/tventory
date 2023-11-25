import { Test, TestingModule } from '@nestjs/testing';
import { ManufactorService } from './manufactor.service';

describe('ManufactorService', () => {
  let service: ManufactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManufactorService],
    }).compile();

    service = module.get<ManufactorService>(ManufactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
