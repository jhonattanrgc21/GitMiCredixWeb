import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutomaticsSecondStepComponent } from './add-automatics-second-step.component';

describe('AddAutomaticsSecondStepComponent', () => {
  let component: AddAutomaticsSecondStepComponent;
  let fixture: ComponentFixture<AddAutomaticsSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutomaticsSecondStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutomaticsSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
