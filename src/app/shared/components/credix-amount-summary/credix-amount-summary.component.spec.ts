import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixAmountSummaryComponent } from './credix-amount-summary.component';

describe('CredixAmountSummaryComponent', () => {
  let component: CredixAmountSummaryComponent;
  let fixture: ComponentFixture<CredixAmountSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixAmountSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixAmountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
