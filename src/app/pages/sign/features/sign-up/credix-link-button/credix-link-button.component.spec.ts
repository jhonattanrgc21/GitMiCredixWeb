import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixLinkButtonComponent} from './credix-link-button.component';

describe('CredixLinkButtonComponent', () => {
  let component: CredixLinkButtonComponent;
  let fixture: ComponentFixture<CredixLinkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixLinkButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
