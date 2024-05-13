import { TestBed } from '@angular/core/testing';

import { ServiceTagsService } from './service-tags.service';

describe('ServiceTagsService', () => {
  let service: ServiceTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
