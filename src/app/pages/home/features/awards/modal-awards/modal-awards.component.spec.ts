import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAwardsComponent } from './modal-awards.component';

describe('ModalAwardsComponent', () => {
  let component: ModalAwardsComponent;
  let fixture: ComponentFixture<ModalAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
