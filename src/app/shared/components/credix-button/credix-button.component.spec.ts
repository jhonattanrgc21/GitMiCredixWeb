import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixButtonComponent} from './credix-button.component';

describe('CredixButtonComponent', () => {
  let component: CredixButtonComponent;
  let fixture: ComponentFixture<CredixButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
