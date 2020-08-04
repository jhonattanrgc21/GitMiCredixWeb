import {TestBed} from '@angular/core/testing';

import {HomeNavigationMenuService} from './home-navigation-menu.service';

describe('HomeNavigationMenuService', () => {
  let service: HomeNavigationMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeNavigationMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
