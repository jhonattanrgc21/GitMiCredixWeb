import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixResultViewComponent} from './credix-result-view.component';

describe('CredixResultViewComponent', () => {
  let component: CredixResultViewComponent;
  let fixture: ComponentFixture<CredixResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixResultViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
