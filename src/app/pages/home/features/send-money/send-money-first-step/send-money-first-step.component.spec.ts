import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendMoneyFirstStepComponent} from './send-money-first-step.component';

describe('FirstStepComponent', () => {
  let component: SendMoneyFirstStepComponent;
  let fixture: ComponentFixture<SendMoneyFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendMoneyFirstStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
