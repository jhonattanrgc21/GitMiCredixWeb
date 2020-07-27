import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixResultNotificationComponent} from './credix-result-notification.component';

describe('CredixResultNotificationComponent', () => {
  let component: CredixResultNotificationComponent;
  let fixture: ComponentFixture<CredixResultNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixResultNotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixResultNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
