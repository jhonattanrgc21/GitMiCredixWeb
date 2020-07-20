import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixPopupComponent} from './credix-popup.component';

describe('CredixPopupComponent', () => {
  let component: CredixPopupComponent;
  let fixture: ComponentFixture<CredixPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
