import {TestBed} from '@angular/core/testing';

import {PublicServicesApiService} from './public-services-api.service';

describe('PublicServicesApiService', () => {
  let service: PublicServicesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicServicesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
