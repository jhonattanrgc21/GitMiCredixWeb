import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnticipatedCancellationComponent} from './anticipated-cancellation.component';

describe('CancellationComponent', () => {
  let component: AnticipatedCancellationComponent;
  let fixture: ComponentFixture<AnticipatedCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnticipatedCancellationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnticipatedCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
