import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixGaugeComponent} from './credix-gauge.component';

describe('CredixGaugeComponent', () => {
  let component: CredixGaugeComponent;
  let fixture: ComponentFixture<CredixGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixGaugeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
