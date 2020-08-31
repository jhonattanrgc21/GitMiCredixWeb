import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FourStepMarchamoComponent} from './four-step-marchamo.component';

describe('FourStepMarchamoComponent', () => {
  let component: FourStepMarchamoComponent;
  let fixture: ComponentFixture<FourStepMarchamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FourStepMarchamoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourStepMarchamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
