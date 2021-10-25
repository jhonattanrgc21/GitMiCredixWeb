import { TestBed } from '@angular/core/testing';

import { ExtendTermTotalOwedService } from './extend-term-total-owed.service';

describe('ExtendTermTotalOwedService', () => {
  let service: ExtendTermTotalOwedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendTermTotalOwedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
