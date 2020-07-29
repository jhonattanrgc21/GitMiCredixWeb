import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignFooterComponent} from './sign-footer.component';

describe('SignFooterComponent', () => {
  let component: SignFooterComponent;
  let fixture: ComponentFixture<SignFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignFooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
