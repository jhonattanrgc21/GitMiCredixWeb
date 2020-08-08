import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMarchamosPayResumeComponent } from './popup-marchamos-pay-resume.component';

describe('PopupMarchamosPayResumeComponent', () => {
  let component: PopupMarchamosPayResumeComponent;
  let fixture: ComponentFixture<PopupMarchamosPayResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMarchamosPayResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMarchamosPayResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
