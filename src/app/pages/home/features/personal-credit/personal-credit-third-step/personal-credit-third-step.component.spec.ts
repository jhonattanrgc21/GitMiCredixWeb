import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCreditThirdStepComponent} from './personal-credit-third-step.component';

describe('PersonalCreditThirdStepComponent', () => {
  let component: PersonalCreditThirdStepComponent;
  let fixture: ComponentFixture<PersonalCreditThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalCreditThirdStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCreditThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
