import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponseSignUpComponent } from './modal-response-sign-up.component';

describe('ModalResponseSignUpComponent', () => {
  let component: ModalResponseSignUpComponent;
  let fixture: ComponentFixture<ModalResponseSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResponseSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResponseSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
