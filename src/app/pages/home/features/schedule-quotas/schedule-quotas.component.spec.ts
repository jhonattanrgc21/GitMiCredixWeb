import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleQuotasComponent } from './schedule-quotas.component';

describe('ScheduleQuotasComponent', () => {
  let component: ScheduleQuotasComponent;
  let fixture: ComponentFixture<ScheduleQuotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleQuotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleQuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
