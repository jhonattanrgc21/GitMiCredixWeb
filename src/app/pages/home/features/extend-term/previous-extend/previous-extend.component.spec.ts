import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousExtendComponent } from './previous-extend.component';

describe('PreviousExtendComponent', () => {
  let component: PreviousExtendComponent;
  let fixture: ComponentFixture<PreviousExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
