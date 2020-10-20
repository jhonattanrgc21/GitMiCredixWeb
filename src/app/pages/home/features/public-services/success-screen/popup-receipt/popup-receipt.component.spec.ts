import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupReceiptComponent} from './popup-receipt.component';

describe('BillingModalComponent', () => {
  let component: PopupReceiptComponent;
  let fixture: ComponentFixture<PopupReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupReceiptComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
