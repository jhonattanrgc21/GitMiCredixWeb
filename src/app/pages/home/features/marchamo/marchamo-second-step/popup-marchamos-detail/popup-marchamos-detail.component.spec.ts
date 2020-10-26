import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupMarchamosDetailComponent} from './popup-marchamos-detail.component';

describe('PopupMarchamosDetailComponent', () => {
  let component: PopupMarchamosDetailComponent;
  let fixture: ComponentFixture<PopupMarchamosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupMarchamosDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMarchamosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
