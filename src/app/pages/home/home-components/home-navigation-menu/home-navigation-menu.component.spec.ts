import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeNavigationMenuComponent} from './home-navigation-menu.component';

describe('SidebarComponent', () => {
  let component: HomeNavigationMenuComponent;
  let fixture: ComponentFixture<HomeNavigationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNavigationMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
