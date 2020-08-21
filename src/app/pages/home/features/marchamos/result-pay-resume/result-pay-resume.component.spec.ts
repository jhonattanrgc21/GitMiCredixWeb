import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPayResumeComponent } from './result-pay-resume.component';

describe('ResultPayResumeComponent', () => {
  let component: ResultPayResumeComponent;
  let fixture: ComponentFixture<ResultPayResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPayResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPayResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
