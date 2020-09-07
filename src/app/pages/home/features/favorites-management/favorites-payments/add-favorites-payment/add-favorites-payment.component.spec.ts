import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddFavoritesPaymentComponent} from './add-favorites-payment.component';

describe('AddFavoritesPaymentComponent', () => {
  let component: AddFavoritesPaymentComponent;
  let fixture: ComponentFixture<AddFavoritesPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFavoritesPaymentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavoritesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
