import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertsAndMessagesComponent} from './alerts-and-messages.component';

describe('AlertsAndMessagesComponent', () => {
  let component: AlertsAndMessagesComponent;
  let fixture: ComponentFixture<AlertsAndMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsAndMessagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsAndMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
