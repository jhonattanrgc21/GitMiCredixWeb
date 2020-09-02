import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyWithoutCardSecondStepComponent} from './buy-without-card-second-step.component';

describe('SecondStepMakeBuyComponent', () => {
  let component: BuyWithoutCardSecondStepComponent;
  let fixture: ComponentFixture<BuyWithoutCardSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyWithoutCardSecondStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyWithoutCardSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
