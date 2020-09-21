import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutomaticsServicesComponent} from './automatics-services.component';

describe('AutomaticsServicesComponent', () => {
  let component: AutomaticsServicesComponent;
  let fixture: ComponentFixture<AutomaticsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutomaticsServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
