import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SecondStepQuotesComponent} from './second-step-quotes.component';

describe('SecondStepQuotesComponent', () => {
  let component: SecondStepQuotesComponent;
  let fixture: ComponentFixture<SecondStepQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondStepQuotesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
