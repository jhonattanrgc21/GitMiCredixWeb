import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoritesPaymentsComponent} from './favorites-payments.component';

describe('FavoritesPaymentsComponent', () => {
  let component: FavoritesPaymentsComponent;
  let fixture: ComponentFixture<FavoritesPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesPaymentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
