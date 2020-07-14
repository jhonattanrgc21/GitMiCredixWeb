import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixPasswordFieldTooltipComponent} from './credix-password-field-tooltip.component';

describe('CredixPasswordFieldTooltipComponent', () => {
  let component: CredixPasswordFieldTooltipComponent;
  let fixture: ComponentFixture<CredixPasswordFieldTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixPasswordFieldTooltipComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPasswordFieldTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
