import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationTablesComponent} from './navigation-tables.component';

describe('NavigationTablesComponent', () => {
  let component: NavigationTablesComponent;
  let fixture: ComponentFixture<NavigationTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationTablesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
