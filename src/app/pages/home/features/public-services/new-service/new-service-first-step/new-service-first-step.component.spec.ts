import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewServiceFirstStepComponent} from './new-service-first-step.component';

describe('NewServiceFirstStepComponent', () => {
  let component: NewServiceFirstStepComponent;
  let fixture: ComponentFixture<NewServiceFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewServiceFirstStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
