import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CredixSliderComponent} from './credix-slider.component';

describe('CredixSliderComponent', () => {
  let component: CredixSliderComponent;
  let fixture: ComponentFixture<CredixSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CredixSliderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredixSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
