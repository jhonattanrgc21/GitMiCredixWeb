import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCreditComponent} from './personal-credit.component';

describe('PersonalCreditComponent', () => {
  let component: PersonalCreditComponent;
  let fixture: ComponentFixture<PersonalCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalCreditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
