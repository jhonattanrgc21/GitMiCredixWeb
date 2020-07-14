import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixNavigationTableComponent} from './credix-navigation-table.component';

describe('NavigationTableComponent', () => {
  let component: CredixNavigationTableComponent;
  let fixture: ComponentFixture<CredixNavigationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixNavigationTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixNavigationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
