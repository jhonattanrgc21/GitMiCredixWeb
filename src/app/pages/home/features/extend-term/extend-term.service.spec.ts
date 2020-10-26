import {TestBed} from '@angular/core/testing';

import {ExtendTermService} from './extend-term.service';

describe('ExtendTermService', () => {
  let service: ExtendTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
