import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendTermComponent } from './extend-term.component';

describe('ExtendTermComponent', () => {
  let component: ExtendTermComponent;
  let fixture: ComponentFixture<ExtendTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
