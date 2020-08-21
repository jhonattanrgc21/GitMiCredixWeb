import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStepMarchamoComponent } from './second-step-marchamo.component';

describe('SecondStepMarchamoComponent', () => {
  let component: SecondStepMarchamoComponent;
  let fixture: ComponentFixture<SecondStepMarchamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondStepMarchamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondStepMarchamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
