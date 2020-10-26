import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovementsToolbarComponent} from './movements-toolbar.component';

describe('MovementsToolbarComponent', () => {
  let component: MovementsToolbarComponent;
  let fixture: ComponentFixture<MovementsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovementsToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
