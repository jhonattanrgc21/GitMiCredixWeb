import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPromoComponent } from './popup-promo.component';

describe('PopupPromoComponent', () => {
  let component: PopupPromoComponent;
  let fixture: ComponentFixture<PopupPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
