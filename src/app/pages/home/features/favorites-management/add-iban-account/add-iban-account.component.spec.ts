import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddIbanAccountComponent} from './add-iban-account.component';

describe('AddIbanAccountComponent', () => {
  let component: AddIbanAccountComponent;
  let fixture: ComponentFixture<AddIbanAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddIbanAccountComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIbanAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
