import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SecondStepMakeBuyComponent} from './second-step-make-buy.component';

describe('SecondStepMakeBuyComponent', () => {
  let component: SecondStepMakeBuyComponent;
  let fixture: ComponentFixture<SecondStepMakeBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondStepMakeBuyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepMakeBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
