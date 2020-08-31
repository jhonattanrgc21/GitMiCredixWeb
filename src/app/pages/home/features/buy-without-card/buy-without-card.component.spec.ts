import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyWithoutCardComponent} from './buy-without-card.component';

describe('BuyWithoutCardComponent', () => {
  let component: BuyWithoutCardComponent;
  let fixture: ComponentFixture<BuyWithoutCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyWithoutCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyWithoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
