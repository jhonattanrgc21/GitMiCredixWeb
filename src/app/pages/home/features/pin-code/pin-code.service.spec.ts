import { TestBed } from '@angular/core/testing';

import { PinCodeService } from './pin-code.service';

describe('PinCodeService', () => {
  let service: PinCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
