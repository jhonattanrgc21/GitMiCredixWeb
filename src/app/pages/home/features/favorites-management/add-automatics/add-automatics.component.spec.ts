import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddAutomaticsComponent} from './add-automatics.component';

describe('AddAutomaticsComponent', () => {
  let component: AddAutomaticsComponent;
  let fixture: ComponentFixture<AddAutomaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAutomaticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutomaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
