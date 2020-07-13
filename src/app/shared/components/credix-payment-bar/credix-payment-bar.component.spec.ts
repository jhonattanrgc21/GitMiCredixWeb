import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixPaymentBarComponent} from './credix-payment-bar.component';

describe('CredixPaymentBarComponent', () => {
  let component: CredixPaymentBarComponent;
  let fixture: ComponentFixture<CredixPaymentBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixPaymentBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPaymentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
