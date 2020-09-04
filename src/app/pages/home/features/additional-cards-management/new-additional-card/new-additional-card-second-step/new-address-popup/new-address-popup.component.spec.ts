import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAddressPopupComponent} from './new-address-popup.component';

describe('NewAddressPopupComponent', () => {
  let component: NewAddressPopupComponent;
  let fixture: ComponentFixture<NewAddressPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewAddressPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
