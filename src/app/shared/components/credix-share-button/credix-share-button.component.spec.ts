import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixShareButtonComponent} from './credix-share-button.component';

describe('CredixShareButtonComponent', () => {
  let component: CredixShareButtonComponent;
  let fixture: ComponentFixture<CredixShareButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixShareButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
