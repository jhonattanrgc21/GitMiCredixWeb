import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchamosComponent } from './marchamos.component';

describe('MarchamosComponent', () => {
  let component: MarchamosComponent;
  let fixture: ComponentFixture<MarchamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
