import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupMarchamosNewDirectionComponent} from './popup-marchamos-new-direction.component';

describe('PopupMarchamosNewDirectionComponent', () => {
  let component: PopupMarchamosNewDirectionComponent;
  let fixture: ComponentFixture<PopupMarchamosNewDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupMarchamosNewDirectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMarchamosNewDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
