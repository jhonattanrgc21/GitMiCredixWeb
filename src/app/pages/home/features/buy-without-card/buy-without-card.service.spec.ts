import { TestBed } from '@angular/core/testing';

import { BuyWithoutCardService } from './buy-without-card.service';

describe('BuyWithoutCardService', () => {
  let service: BuyWithoutCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyWithoutCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
