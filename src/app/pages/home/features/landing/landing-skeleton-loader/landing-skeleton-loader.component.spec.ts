import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSkeletonLoaderComponent } from './landing-skeleton-loader.component';

describe('LandingSkeletonLoaderComponent', () => {
  let component: LandingSkeletonLoaderComponent;
  let fixture: ComponentFixture<LandingSkeletonLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingSkeletonLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
