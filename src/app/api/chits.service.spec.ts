import { TestBed } from '@angular/core/testing';

import { ChitsService } from './chits.service';

describe('ChitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChitsService = TestBed.get(ChitsService);
    expect(service).toBeTruthy();
  });
});
