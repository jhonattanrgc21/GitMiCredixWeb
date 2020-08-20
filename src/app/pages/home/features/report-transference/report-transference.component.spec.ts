import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportTransferenceComponent} from './report-transference.component';

describe('ReportTransferenceComponent', () => {
  let component: ReportTransferenceComponent;
  let fixture: ComponentFixture<ReportTransferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportTransferenceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTransferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
