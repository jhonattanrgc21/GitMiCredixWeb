import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPopupComponent } from './slider-popup.component';

describe('SliderPopupComponent', () => {
  let component: SliderPopupComponent;
  let fixture: ComponentFixture<SliderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
