import { TestBed } from '@angular/core/testing';

import { ExtendTermTotalOwedApiService } from './extend-term-total-owed-api.service';

describe('ExtendTermTotalOwedApoiService', () => {
  let service: ExtendTermTotalOwedApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendTermTotalOwedApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
