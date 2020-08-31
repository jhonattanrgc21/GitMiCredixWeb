import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FirstStepCredixCodeComponent} from './first-step-credix-code.component';

describe('FirstStepCredixCodeComponent', () => {
  let component: FirstStepCredixCodeComponent;
  let fixture: ComponentFixture<FirstStepCredixCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirstStepCredixCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStepCredixCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
