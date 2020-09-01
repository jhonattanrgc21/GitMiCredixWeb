import {TestBed} from '@angular/core/testing';

import {FavoritesManagementService} from './favorites-management.service';

describe('FavoritesManagementService', () => {
  let service: FavoritesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
