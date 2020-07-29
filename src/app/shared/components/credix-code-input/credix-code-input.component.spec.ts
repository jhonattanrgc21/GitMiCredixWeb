import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixCodeInputComponent} from './credix-code-input.component';

describe('CredixInputDisableComponent', () => {
  let component: CredixCodeInputComponent;
  let fixture: ComponentFixture<CredixCodeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixCodeInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
