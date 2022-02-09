import { TestBed } from '@angular/core/testing';

import { InstalmentService } from './instalment.service';

describe('InstalmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstalmentService = TestBed.get(InstalmentService);
    expect(service).toBeTruthy();
  });
});
