import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupMarchamosPaymentSummaryComponent} from './popup-marchamos-payment-summary.component';

describe('PopupMarchamosPayResumeComponent', () => {
  let component: PopupMarchamosPaymentSummaryComponent;
  let fixture: ComponentFixture<PopupMarchamosPaymentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupMarchamosPaymentSummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMarchamosPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
