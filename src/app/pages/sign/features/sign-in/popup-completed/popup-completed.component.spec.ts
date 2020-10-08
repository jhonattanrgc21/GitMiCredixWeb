import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupCompletedComponent} from './popup-completed.component';

describe('PopupCompletedComponent', () => {
  let component: PopupCompletedComponent;
  let fixture: ComponentFixture<PopupCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCompletedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
