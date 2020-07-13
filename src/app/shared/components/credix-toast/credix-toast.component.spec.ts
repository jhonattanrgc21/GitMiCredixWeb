import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixToastComponent} from './credix-toast.component';

describe('CredixToastComponent', () => {
  let component: CredixToastComponent;
  let fixture: ComponentFixture<CredixToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixToastComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
