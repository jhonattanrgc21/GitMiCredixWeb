import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixNumericBlockComponent} from './credix-numeric-block.component';

describe('CredixNumericBlockComponent', () => {
  let component: CredixNumericBlockComponent;
  let fixture: ComponentFixture<CredixNumericBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixNumericBlockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixNumericBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
