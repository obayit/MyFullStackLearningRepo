import { TestBed } from '@angular/core/testing';

import { PerfService } from './perf.service';

describe('PerfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfService = TestBed.get(PerfService);
    expect(service).toBeTruthy();
  });
});
