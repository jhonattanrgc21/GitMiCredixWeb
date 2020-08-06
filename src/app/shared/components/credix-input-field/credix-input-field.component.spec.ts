import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixInputFieldComponent} from './credix-input-field.component';

describe('CredixInputFieldComponent', () => {
  let component: CredixInputFieldComponent;
  let fixture: ComponentFixture<CredixInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixInputFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
