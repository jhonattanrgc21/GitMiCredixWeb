import {TestBed} from '@angular/core/testing';

import {IncreaseLimitService} from './increase-limit.service';

describe('IncreaseLimitService', () => {
  let service: IncreaseLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncreaseLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
