import {TestBed} from '@angular/core/testing';

import {MarchamosService} from './marchamos.service';

describe('MarchamosService', () => {
  let service: MarchamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarchamosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
