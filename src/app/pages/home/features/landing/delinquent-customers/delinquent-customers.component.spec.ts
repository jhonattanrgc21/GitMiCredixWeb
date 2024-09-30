import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelinquentCustomersComponent } from './delinquent-customers.component';

describe('DelinquentCustomersComponent', () => {
  let component: DelinquentCustomersComponent;
  let fixture: ComponentFixture<DelinquentCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelinquentCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelinquentCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
