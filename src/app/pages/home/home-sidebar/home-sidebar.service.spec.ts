import {TestBed} from '@angular/core/testing';

import {HomeSidebarService} from './home-sidebar.service';

describe('HomeNavigationMenuService', () => {
  let service: HomeSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
