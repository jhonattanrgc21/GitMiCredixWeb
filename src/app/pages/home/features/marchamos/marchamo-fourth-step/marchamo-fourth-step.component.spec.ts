import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarchamoFourthStepComponent} from './marchamo-fourth-step.component';

describe('FourStepMarchamoComponent', () => {
  let component: MarchamoFourthStepComponent;
  let fixture: ComponentFixture<MarchamoFourthStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarchamoFourthStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamoFourthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
