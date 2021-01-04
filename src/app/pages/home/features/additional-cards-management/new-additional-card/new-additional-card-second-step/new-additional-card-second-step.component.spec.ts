import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAdditionalCardSecondStepComponent} from './new-additional-card-second-step.component';

describe('NewAdditionalCardSecondStepComponent', () => {
  let component: NewAdditionalCardSecondStepComponent;
  let fixture: ComponentFixture<NewAdditionalCardSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewAdditionalCardSecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionalCardSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
