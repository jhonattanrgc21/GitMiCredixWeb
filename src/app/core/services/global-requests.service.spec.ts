import {TestBed} from '@angular/core/testing';

import {GlobalRequestsService} from './global-requests.service';

describe('GlobalRequestsService', () => {
  let service: GlobalRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
