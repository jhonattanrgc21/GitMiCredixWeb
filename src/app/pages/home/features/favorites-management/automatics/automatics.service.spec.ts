import { TestBed } from '@angular/core/testing';

import { AutomaticsService } from './automatics.service';

describe('AutomaticsService', () => {
  let service: AutomaticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomaticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
