import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewServiceSecondStepComponent} from './new-service-second-step.component';

describe('NewServiceSecondStepComponent', () => {
  let component: NewServiceSecondStepComponent;
  let fixture: ComponentFixture<NewServiceSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewServiceSecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
