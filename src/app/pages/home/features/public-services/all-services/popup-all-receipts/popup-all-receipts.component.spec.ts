import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupAllReceiptsComponent} from './popup-all-receipts.component';

describe('PopupAllReceiptsComponent', () => {
  let component: PopupAllReceiptsComponent;
  let fixture: ComponentFixture<PopupAllReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAllReceiptsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAllReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
