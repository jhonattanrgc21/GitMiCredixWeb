import {TestBed} from '@angular/core/testing';

import {AnticipatedCancellationService} from './anticipated-cancellation.service';

describe('AnticipatedCancellationService', () => {
  let service: AnticipatedCancellationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnticipatedCancellationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
