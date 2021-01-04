import {TestBed} from '@angular/core/testing';

import {ChangePinService} from './change-pin.service';

describe('ChangePinService', () => {
  let service: ChangePinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
