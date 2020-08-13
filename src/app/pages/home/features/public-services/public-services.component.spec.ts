import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServicesComponent } from './public-services.component';

describe('PublicServicesComponent', () => {
  let component: PublicServicesComponent;
  let fixture: ComponentFixture<PublicServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
