import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteServicesComponent} from './favorite-services.component';

describe('FavoriteServicesComponent', () => {
  let component: FavoriteServicesComponent;
  let fixture: ComponentFixture<FavoriteServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
