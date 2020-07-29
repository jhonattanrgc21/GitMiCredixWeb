import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignHeaderComponent} from './sign-header.component';

describe('SignBannerComponent', () => {
  let component: SignHeaderComponent;
  let fixture: ComponentFixture<SignHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
