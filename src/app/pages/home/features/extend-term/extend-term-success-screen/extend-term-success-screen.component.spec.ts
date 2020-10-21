import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExtendTermSuccessScreenComponent} from './extend-term-success-screen.component';

describe('ExtendTermSuccessScreenComponent', () => {
  let component: ExtendTermSuccessScreenComponent;
  let fixture: ComponentFixture<ExtendTermSuccessScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendTermSuccessScreenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendTermSuccessScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
