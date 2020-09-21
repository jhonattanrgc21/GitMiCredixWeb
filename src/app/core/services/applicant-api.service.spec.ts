import {TestBed} from '@angular/core/testing';

import {ApplicantApiService} from './applicant-api.service';

describe('ApplicantApiService', () => {
  let service: ApplicantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
