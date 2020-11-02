import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixCalendarInputComponent} from './credix-calendar-input.component';

describe('CredixCalendarInputComponent', () => {
  let component: CredixCalendarInputComponent;
  let fixture: ComponentFixture<CredixCalendarInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixCalendarInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixCalendarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
