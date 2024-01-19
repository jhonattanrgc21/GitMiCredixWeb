import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredixAllowedMovementComponent } from './credix-allowed-movement.component';

describe('CredixAllowedMovementComponent', () => {
  let component: CredixAllowedMovementComponent;
  let fixture: ComponentFixture<CredixAllowedMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredixAllowedMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixAllowedMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
