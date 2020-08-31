import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarchamoThirdStepComponent} from './marchamo-third-step.component';

describe('ThirstyStepMarchamoComponent', () => {
  let component: MarchamoThirdStepComponent;
  let fixture: ComponentFixture<MarchamoThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarchamoThirdStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamoThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
