import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {PaymentPlacesComponent} from './payment-places.component';
import {HttpService} from 'src/app/core/services/http.service';

describe('PaymentPlacesComponent', () => {
  let component: PaymentPlacesComponent;
  let fixture: ComponentFixture<PaymentPlacesComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPlacesComponent],
      providers: [HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display places by default', async(() => {
    element = fixture.debugElement.query(By.css('.navigation-table')).nativeElement;
    expect(element.querySelector('.navigation-table__content')).toBeTruthy();
  }));

  it('should display digital patyments after clicking second tab', async(() => {
    element = fixture.debugElement.query(By.css('.credix-tab__label .ng-star-inserted')).nativeElement;
    element.click();
    expect(element.querySelector('.digital-payments__content')).toBeTruthy();
  }));


});
