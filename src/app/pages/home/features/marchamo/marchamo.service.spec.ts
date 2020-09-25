import {TestBed} from '@angular/core/testing';

import {MarchamoService} from './marchamo.service';

describe('MarchamosService', () => {
  let service: MarchamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarchamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
