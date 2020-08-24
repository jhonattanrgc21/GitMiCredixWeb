import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThirstyStepEmailRegisteredComponent} from './thirsty-step-email-registered.component';

describe('ThirstyStepEmailRegisteredComponent', () => {
  let component: ThirstyStepEmailRegisteredComponent;
  let fixture: ComponentFixture<ThirstyStepEmailRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThirstyStepEmailRegisteredComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirstyStepEmailRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
