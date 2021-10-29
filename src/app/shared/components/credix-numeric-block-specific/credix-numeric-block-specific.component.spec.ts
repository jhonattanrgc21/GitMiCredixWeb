import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixNumericBlockSpecificComponent} from './credix-numeric-block-specific.component';

describe('CredixNumericBlockComponent', () => {
  let component: CredixNumericBlockSpecificComponent;
  let fixture: ComponentFixture<CredixNumericBlockSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixNumericBlockSpecificComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixNumericBlockSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
