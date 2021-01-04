import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixConfirmationPopupComponent} from './credix-confirmation-popup.component';

describe('CredixConfirmationPopupComponent', () => {
  let component: CredixConfirmationPopupComponent;
  let fixture: ComponentFixture<CredixConfirmationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixConfirmationPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
