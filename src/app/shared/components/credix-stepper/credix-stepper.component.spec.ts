import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixStepperComponent} from './credix-stepper.component';

describe('CredixStepperComponent', () => {
  let component: CredixStepperComponent;
  let fixture: ComponentFixture<CredixStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixStepperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
