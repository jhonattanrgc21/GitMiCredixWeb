import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarchamoFirstStepComponent} from './marchamo-first-step.component';

describe('FirstStepComponent', () => {
  let component: MarchamoFirstStepComponent;
  let fixture: ComponentFixture<MarchamoFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarchamoFirstStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamoFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
