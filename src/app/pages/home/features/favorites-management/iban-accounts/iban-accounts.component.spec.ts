import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IbanAccountsComponent} from './iban-accounts.component';

describe('IbanAccountsComponent', () => {
  let component: IbanAccountsComponent;
  let fixture: ComponentFixture<IbanAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IbanAccountsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbanAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
