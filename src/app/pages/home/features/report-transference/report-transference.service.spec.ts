import {TestBed} from '@angular/core/testing';

import {ReportTransferenceService} from './report-transference.service';

describe('ReportTransferenceService', () => {
  let service: ReportTransferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportTransferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
