import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdressPopupComponent } from './new-address-popup.component';

describe('NewAdressPopupComponent', () => {
  let component: NewAdressPopupComponent;
  let fixture: ComponentFixture<NewAdressPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdressPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
