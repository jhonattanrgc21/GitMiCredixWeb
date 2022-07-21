import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendTermTotalOwedComponent } from './extend-term-total-owed.component';

describe('ExtendTermTotalOwedComponent', () => {
  let component: ExtendTermTotalOwedComponent;
  let fixture: ComponentFixture<ExtendTermTotalOwedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendTermTotalOwedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendTermTotalOwedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
