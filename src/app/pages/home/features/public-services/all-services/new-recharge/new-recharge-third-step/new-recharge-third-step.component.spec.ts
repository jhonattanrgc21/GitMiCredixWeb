import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRechargeThirdStepComponent } from './new-recharge-third-step.component';

describe('NewRechargeThirdStepComponent', () => {
  let component: NewRechargeThirdStepComponent;
  let fixture: ComponentFixture<NewRechargeThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRechargeThirdStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRechargeThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
