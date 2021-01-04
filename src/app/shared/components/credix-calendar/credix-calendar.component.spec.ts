import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixCalendarComponent} from './credix-calendar.component';

describe('CredixCalendarComponent', () => {
  let component: CredixCalendarComponent;
  let fixture: ComponentFixture<CredixCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
