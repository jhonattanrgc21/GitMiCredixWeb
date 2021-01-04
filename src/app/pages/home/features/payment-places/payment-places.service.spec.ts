import {TestBed} from '@angular/core/testing';

import {PaymentPlacesService} from './payment-places.service';

describe('PaymentPlacesService', () => {
  let service: PaymentPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
