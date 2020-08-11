import {TestBed} from '@angular/core/testing';

import {GoHomeService} from './go-home.service';

describe('GoHomeService', () => {
  let service: GoHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
