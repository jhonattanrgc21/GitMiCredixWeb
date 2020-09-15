import {TestBed} from '@angular/core/testing';

import {FavoritesPaymentsService} from './favorites-payments.service';

describe('FavoritesPaymentsService', () => {
  let service: FavoritesPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
