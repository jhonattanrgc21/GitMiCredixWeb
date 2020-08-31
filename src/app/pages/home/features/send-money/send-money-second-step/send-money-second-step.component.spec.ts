import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendMoneySecondStepComponent} from './send-money-second-step.component';

describe('SecondStepComponent', () => {
  let component: SendMoneySecondStepComponent;
  let fixture: ComponentFixture<SendMoneySecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendMoneySecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneySecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
