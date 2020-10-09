import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewRechargeSecondStepComponent} from './new-recharge-second-step.component';

describe('NewRechargeSecondStepComponent', () => {
  let component: NewRechargeSecondStepComponent;
  let fixture: ComponentFixture<NewRechargeSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRechargeSecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRechargeSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
