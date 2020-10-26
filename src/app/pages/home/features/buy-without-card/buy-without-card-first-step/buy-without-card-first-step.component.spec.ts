import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyWithoutCardFirstStepComponent} from './buy-without-card-first-step.component';

describe('FirstStepCredixCodeComponent', () => {
  let component: BuyWithoutCardFirstStepComponent;
  let fixture: ComponentFixture<BuyWithoutCardFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyWithoutCardFirstStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyWithoutCardFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
