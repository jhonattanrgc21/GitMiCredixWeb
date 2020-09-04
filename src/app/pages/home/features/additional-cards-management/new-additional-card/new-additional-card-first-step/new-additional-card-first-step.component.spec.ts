import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAdditionalCardFirstStepComponent} from './new-additional-card-first-step.component';

describe('NewAdditionalCardFirstStepComponent', () => {
  let component: NewAdditionalCardFirstStepComponent;
  let fixture: ComponentFixture<NewAdditionalCardFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewAdditionalCardFirstStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionalCardFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
