import { TestBed } from '@angular/core/testing';

import { BudgetserviceService } from './budgetservice.service';

describe('BudgetserviceService', () => {
  let service: BudgetserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
