/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PlanificationDepensesService } from './planification-depenses.service';

describe('PlanificationDepensesService', () => {
  let service: PlanificationDepensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanificationDepensesService],
    }).compile();

    service = module.get<PlanificationDepensesService>(PlanificationDepensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
