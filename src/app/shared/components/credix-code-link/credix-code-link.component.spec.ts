import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixCodeLinkComponent} from './credix-code-link.component';

describe('CredixCodeLinkComponent', () => {
  let component: CredixCodeLinkComponent;
  let fixture: ComponentFixture<CredixCodeLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixCodeLinkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixCodeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
