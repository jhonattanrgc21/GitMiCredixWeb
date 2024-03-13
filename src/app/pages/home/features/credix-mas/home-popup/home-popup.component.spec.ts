import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePopupComponent } from './home-popup.component';

describe('HomePopupComponent', () => {
  let component: HomePopupComponent;
  let fixture: ComponentFixture<HomePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
