import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddIbanComponent } from './modal-add-iban.component';

describe('ModalAddIbanComponent', () => {
  let component: ModalAddIbanComponent;
  let fixture: ComponentFixture<ModalAddIbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddIbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
