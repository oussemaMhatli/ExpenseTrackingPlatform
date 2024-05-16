import { Test, TestingModule } from '@nestjs/testing';
import { PlanificationDepensesController } from './planification-depenses.controller';
import { PlanificationDepensesService } from './planification-depenses.service';

describe('PlanificationDepensesController', () => {
  let controller: PlanificationDepensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanificationDepensesController],
      providers: [PlanificationDepensesService],
    }).compile();

    controller = module.get<PlanificationDepensesController>(PlanificationDepensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
