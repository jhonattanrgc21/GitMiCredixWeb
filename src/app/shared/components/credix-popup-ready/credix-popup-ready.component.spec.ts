import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixPopupReadyComponent } from './credix-popup-ready.component';

describe('CredixPopupReadyComponent', () => {
  let component: CredixPopupReadyComponent;
  let fixture: ComponentFixture<CredixPopupReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixPopupReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPopupReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
