import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixSwitchComponent} from './credix-switch.component';

describe('CredixSwitchComponent', () => {
  let component: CredixSwitchComponent;
  let fixture: ComponentFixture<CredixSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixSwitchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
