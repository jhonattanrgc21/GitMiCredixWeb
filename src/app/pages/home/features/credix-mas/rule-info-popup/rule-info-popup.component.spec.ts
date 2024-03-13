import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleInfoPopupComponent } from './rule-info-popup.component';

describe('RuleInfoPopupComponent', () => {
  let component: RuleInfoPopupComponent;
  let fixture: ComponentFixture<RuleInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
