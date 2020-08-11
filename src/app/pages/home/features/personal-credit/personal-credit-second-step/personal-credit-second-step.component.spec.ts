import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCreditSecondStepComponent} from './personal-credit-second-step.component';

describe('PersonalCreditSecondStepComponent', () => {
  let component: PersonalCreditSecondStepComponent;
  let fixture: ComponentFixture<PersonalCreditSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalCreditSecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCreditSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
