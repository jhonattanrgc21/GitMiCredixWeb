import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IncreaseLimitComponent} from './increase-limit.component';

describe('IncreaseLimitComponent', () => {
  let component: IncreaseLimitComponent;
  let fixture: ComponentFixture<IncreaseLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncreaseLimitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
