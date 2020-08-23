import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FourStepConfirmContactComponent} from './four-step-confirm-contact.component';

describe('FourStepConfirmContactComponent', () => {
  let component: FourStepConfirmContactComponent;
  let fixture: ComponentFixture<FourStepConfirmContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FourStepConfirmContactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourStepConfirmContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
