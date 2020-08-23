import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsultInformationComponent} from './consult-information.component';

describe('ConsultInformationComponent', () => {
  let component: ConsultInformationComponent;
  let fixture: ComponentFixture<ConsultInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultInformationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
