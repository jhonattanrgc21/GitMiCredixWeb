import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarchamoSecondStepComponent} from './marchamo-second-step.component';

describe('SecondStepMarchamoComponent', () => {
  let component: MarchamoSecondStepComponent;
  let fixture: ComponentFixture<MarchamoSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarchamoSecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamoSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
