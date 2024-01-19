import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentExtendComponent } from './recent-extend.component';

describe('RecentExtendComponent', () => {
  let component: RecentExtendComponent;
  let fixture: ComponentFixture<RecentExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
