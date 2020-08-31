import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThirstyStepMarchamoComponent} from './thirsty-step-marchamo.component';

describe('ThirstyStepMarchamoComponent', () => {
  let component: ThirstyStepMarchamoComponent;
  let fixture: ComponentFixture<ThirstyStepMarchamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThirstyStepMarchamoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirstyStepMarchamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
