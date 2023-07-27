import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixPopupPromoComponent } from './credix-popup-promo.component';

describe('CredixPopupPromoComponent', () => {
  let component: CredixPopupPromoComponent;
  let fixture: ComponentFixture<CredixPopupPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixPopupPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPopupPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
