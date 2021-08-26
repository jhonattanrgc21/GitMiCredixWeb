import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutomaticsFirstStepComponent } from './add-automatics-first-step.component';

describe('AddAutomaticsFirstStepComponent', () => {
  let component: AddAutomaticsFirstStepComponent;
  let fixture: ComponentFixture<AddAutomaticsFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutomaticsFirstStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutomaticsFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
