import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribePopupComponent } from './subscribe-popup.component';

describe('SubscribePopupComponent', () => {
  let component: SubscribePopupComponent;
  let fixture: ComponentFixture<SubscribePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
