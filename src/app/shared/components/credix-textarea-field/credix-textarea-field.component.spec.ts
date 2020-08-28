import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixTextareaFieldComponent} from './credix-textarea-field.component';

describe('CredixInputFieldComponent', () => {
  let component: CredixTextareaFieldComponent;
  let fixture: ComponentFixture<CredixTextareaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixTextareaFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixTextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
