import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovementsAccountStatementComponent} from './movements-&-account-statement.component';

describe('MovementsStateAccountComponent', () => {
  let component: MovementsAccountStatementComponent;
  let fixture: ComponentFixture<MovementsAccountStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovementsAccountStatementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
