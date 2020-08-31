import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarchamoFourStepComponent} from './marchamo-four-step.component';

describe('FourStepMarchamoComponent', () => {
  let component: MarchamoFourStepComponent;
  let fixture: ComponentFixture<MarchamoFourStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarchamoFourStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamoFourStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
