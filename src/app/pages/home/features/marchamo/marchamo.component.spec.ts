import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarchamoComponent} from './marchamo.component';

describe('MarchamosComponent', () => {
  let component: MarchamoComponent;
  let fixture: ComponentFixture<MarchamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarchamoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
