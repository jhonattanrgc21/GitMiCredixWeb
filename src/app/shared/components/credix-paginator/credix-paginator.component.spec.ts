import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixPaginatorComponent} from './credix-paginator.component';

describe('CredixPaginatorComponent', () => {
  let component: CredixPaginatorComponent;
  let fixture: ComponentFixture<CredixPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixPaginatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
