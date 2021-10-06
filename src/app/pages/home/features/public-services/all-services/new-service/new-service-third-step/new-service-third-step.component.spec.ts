import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceThirdStepComponent } from './new-service-third-step.component';

describe('NewServiceThirdStepComponent', () => {
  let component: NewServiceThirdStepComponent;
  let fixture: ComponentFixture<NewServiceThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServiceThirdStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
