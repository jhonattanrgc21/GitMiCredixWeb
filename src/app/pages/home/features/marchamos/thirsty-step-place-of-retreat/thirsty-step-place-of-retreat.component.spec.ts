import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThirstyStepPlaceOfRetreatComponent} from './thirsty-step-place-of-retreat.component';

describe('ThirstyStepPlaceOfRetreatComponent', () => {
  let component: ThirstyStepPlaceOfRetreatComponent;
  let fixture: ComponentFixture<ThirstyStepPlaceOfRetreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThirstyStepPlaceOfRetreatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirstyStepPlaceOfRetreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
