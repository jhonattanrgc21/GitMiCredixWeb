import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPinComponent } from './current-pin.component';

describe('CurrentPinComponent', () => {
  let component: CurrentPinComponent;
  let fixture: ComponentFixture<CurrentPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
