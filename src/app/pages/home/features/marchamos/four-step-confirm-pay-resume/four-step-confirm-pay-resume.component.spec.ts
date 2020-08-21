import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourStepConfirmPayResumeComponent } from './four-step-confirm-pay-resume.component';

describe('FourStepConfirmPayResumeComponent', () => {
  let component: FourStepConfirmPayResumeComponent;
  let fixture: ComponentFixture<FourStepConfirmPayResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourStepConfirmPayResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourStepConfirmPayResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
