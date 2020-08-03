import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponseComponent } from './modal-response.component';

describe('ModalResponseComponent', () => {
  let component: ModalResponseComponent;
  let fixture: ComponentFixture<ModalResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
