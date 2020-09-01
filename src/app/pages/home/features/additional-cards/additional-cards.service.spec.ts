import {TestBed} from '@angular/core/testing';

import {AdditionalCardsService} from './additional-cards.service';

describe('AdditionalCardsService', () => {
  let service: AdditionalCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
