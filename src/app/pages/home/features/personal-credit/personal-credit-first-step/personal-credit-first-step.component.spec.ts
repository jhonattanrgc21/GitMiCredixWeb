import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCreditFirstStepComponent} from './personal-credit-first-step.component';

describe('PersonalCreditFirstStepComponent', () => {
  let component: PersonalCreditFirstStepComponent;
  let fixture: ComponentFixture<PersonalCreditFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalCreditFirstStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCreditFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
