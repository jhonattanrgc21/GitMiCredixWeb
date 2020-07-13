import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonsAndLinksComponent} from './buttons-and-links.component';

describe('ButtonsAndLinksComponent', () => {
  let component: ButtonsAndLinksComponent;
  let fixture: ComponentFixture<ButtonsAndLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsAndLinksComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsAndLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
