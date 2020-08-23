import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SecondStepOptionalInsurancesComponent} from './second-step-optional-insurances.component';

describe('SecondStepOptionalInsurancesComponent', () => {
  let component: SecondStepOptionalInsurancesComponent;
  let fixture: ComponentFixture<SecondStepOptionalInsurancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondStepOptionalInsurancesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepOptionalInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
