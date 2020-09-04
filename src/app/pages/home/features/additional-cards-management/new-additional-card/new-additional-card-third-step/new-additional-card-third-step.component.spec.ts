import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAdditionalCardThirdStepComponent} from './new-additional-card-third-step.component';

describe('NewAdditionalCardThirdStepComponent', () => {
  let component: NewAdditionalCardThirdStepComponent;
  let fixture: ComponentFixture<NewAdditionalCardThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewAdditionalCardThirdStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionalCardThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
