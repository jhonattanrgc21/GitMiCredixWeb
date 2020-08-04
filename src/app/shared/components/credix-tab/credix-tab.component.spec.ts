import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixTabComponent} from './credix-tab.component';

describe('CredixTabsComponent', () => {
  let component: CredixTabComponent;
  let fixture: ComponentFixture<CredixTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
