import {TestBed} from '@angular/core/testing';

import {IbanAccountsService} from './iban-accounts.service';

describe('IbanAccountsService', () => {
  let service: IbanAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbanAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
