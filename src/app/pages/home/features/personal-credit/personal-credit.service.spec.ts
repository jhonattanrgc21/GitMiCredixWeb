import {TestBed} from '@angular/core/testing';

import {PersonalCreditService} from './personal-credit.service';

describe('PersonalCreditService', () => {
  let service: PersonalCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
