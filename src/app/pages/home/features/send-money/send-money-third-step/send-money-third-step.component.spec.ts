import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SendMoneyThirdStepComponent} from './send-money-third-step.component';

describe('ThirdStepComponent', () => {
  let component: SendMoneyThirdStepComponent;
  let fixture: ComponentFixture<SendMoneyThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendMoneyThirdStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMoneyThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
