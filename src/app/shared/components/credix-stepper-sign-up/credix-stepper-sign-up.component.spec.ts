import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixStepperSignUpComponent} from './credix-stepper-sign-up.component';

describe('CredixStepperSignUpComponent', () => {
  let component: CredixStepperSignUpComponent;
  let fixture: ComponentFixture<CredixStepperSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixStepperSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixStepperSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
