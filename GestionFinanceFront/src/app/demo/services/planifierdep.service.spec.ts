import { TestBed } from '@angular/core/testing';

import { PlanifierdepService } from './planifierdep.service';

describe('PlanifierdepService', () => {
  let service: PlanifierdepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanifierdepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
