import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAdditionalCardComponent} from './new-additional-card.component';

describe('NewAdditionalCardComponent', () => {
  let component: NewAdditionalCardComponent;
  let fixture: ComponentFixture<NewAdditionalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewAdditionalCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
