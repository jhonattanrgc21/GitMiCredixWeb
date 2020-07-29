import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixProgressBarComponent} from './credix-progress-bar.component';

describe('CredixProgressBarComponent', () => {
  let component: CredixProgressBarComponent;
  let fixture: ComponentFixture<CredixProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixProgressBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
