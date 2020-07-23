import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalSignUpResponseComponent} from './modal-sign-up-response.component';

describe('ModalSignUpResponseComponent', () => {
  let component: ModalSignUpResponseComponent;
  let fixture: ComponentFixture<ModalSignUpResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSignUpResponseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignUpResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
