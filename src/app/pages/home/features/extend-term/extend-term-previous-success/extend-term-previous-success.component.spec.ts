import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendTermPreviousSuccessComponent } from './extend-term-previous-success.component';

describe('ExtendTermPreviousSuccessComponent', () => {
  let component: ExtendTermPreviousSuccessComponent;
  let fixture: ComponentFixture<ExtendTermPreviousSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendTermPreviousSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendTermPreviousSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
