import {TestBed} from '@angular/core/testing';

import {AdditionalCardsManagementService} from './additional-cards-management.service';

describe('AdditionalCardsService', () => {
  let service: AdditionalCardsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalCardsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
