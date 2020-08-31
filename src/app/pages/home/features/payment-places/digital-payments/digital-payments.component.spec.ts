import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DigitalPaymentsComponent} from './digital-payments.component';

describe('DigitalPaymentsComponent', () => {
  let component: DigitalPaymentsComponent;
  let fixture: ComponentFixture<DigitalPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalPaymentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
