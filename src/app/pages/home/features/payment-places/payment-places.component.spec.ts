import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlacesComponent } from './payment-places.component';

describe('PaymentPlacesComponent', () => {
  let component: PaymentPlacesComponent;
  let fixture: ComponentFixture<PaymentPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
