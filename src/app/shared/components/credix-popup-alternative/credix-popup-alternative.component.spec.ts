import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixPopupAlternativeComponent} from './credix-popup-alternative.component';

describe('CredixPopupAlternativeComponent', () => {
  let component: CredixPopupAlternativeComponent;
  let fixture: ComponentFixture<CredixPopupAlternativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixPopupAlternativeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPopupAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
