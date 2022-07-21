import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendTermTotalNotificationComponent } from './extend-term-total-notification.component';

describe('ExtendTermTotalNotificationComponent', () => {
  let component: ExtendTermTotalNotificationComponent;
  let fixture: ComponentFixture<ExtendTermTotalNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendTermTotalNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendTermTotalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
