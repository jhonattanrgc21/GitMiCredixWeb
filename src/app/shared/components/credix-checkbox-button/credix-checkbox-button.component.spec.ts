import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixCheckboxButtonComponent} from './credix-checkbox-button.component';

describe('CredixCheckboxButtonsComponent', () => {
  let component: CredixCheckboxButtonComponent;
  let fixture: ComponentFixture<CredixCheckboxButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixCheckboxButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixCheckboxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
