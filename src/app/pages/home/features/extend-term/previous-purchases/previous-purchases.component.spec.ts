import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPurchasesComponent } from './previous-purchases.component';

describe('PreviousPurchasesComponent', () => {
  let component: PreviousPurchasesComponent;
  let fixture: ComponentFixture<PreviousPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
