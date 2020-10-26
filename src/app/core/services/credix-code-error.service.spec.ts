import {TestBed} from '@angular/core/testing';

import {CredixCodeErrorService} from './credix-code-error.service';

describe('CredixCodeErrorService', () => {
  let service: CredixCodeErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredixCodeErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
