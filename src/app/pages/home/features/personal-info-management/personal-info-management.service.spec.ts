import {TestBed} from '@angular/core/testing';

import {PersonalInfoManagementService} from './personal-info-management.service';

describe('PersonalInfoService', () => {
  let service: PersonalInfoManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInfoManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
