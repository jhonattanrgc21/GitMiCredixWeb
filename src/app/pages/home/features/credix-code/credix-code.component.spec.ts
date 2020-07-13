import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixCodeComponent} from './credix-code.component';

describe('CredixCodeComponent', () => {
  let component: CredixCodeComponent;
  let fixture: ComponentFixture<CredixCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
