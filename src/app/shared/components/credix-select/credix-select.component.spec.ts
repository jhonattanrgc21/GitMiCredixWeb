import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixSelectComponent} from './credix-select.component';

describe('CredixSelectComponent', () => {
  let component: CredixSelectComponent;
  let fixture: ComponentFixture<CredixSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
