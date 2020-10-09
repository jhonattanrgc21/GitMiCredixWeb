import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixDatePickerComponent} from './credix-date-picker.component';

describe('CredixDatePickerComponent', () => {
  let component: CredixDatePickerComponent;
  let fixture: ComponentFixture<CredixDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixDatePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
