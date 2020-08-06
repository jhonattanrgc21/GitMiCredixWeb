import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixInputPasswordComponent} from './credix-input-password.component';

describe('CredixInputPasswordComponent', () => {
  let component: CredixInputPasswordComponent;
  let fixture: ComponentFixture<CredixInputPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixInputPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
