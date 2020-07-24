import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixRadioButtonComponent} from './credix-radio-button.component';

describe('CredixRadioButtonsComponent', () => {
  let component: CredixRadioButtonComponent;
  let fixture: ComponentFixture<CredixRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixRadioButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
