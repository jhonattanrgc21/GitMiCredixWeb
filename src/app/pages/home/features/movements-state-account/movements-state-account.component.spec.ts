import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsStateAccountComponent } from './movements-state-account.component';

describe('MovementsStateAccountComponent', () => {
  let component: MovementsStateAccountComponent;
  let fixture: ComponentFixture<MovementsStateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsStateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsStateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
