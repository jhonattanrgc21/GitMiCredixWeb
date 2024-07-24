import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPreviousInfoComponent } from './popup-previous-info.component';

describe('PopupPreviousInfoComponent', () => {
  let component: PopupPreviousInfoComponent;
  let fixture: ComponentFixture<PopupPreviousInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPreviousInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPreviousInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
