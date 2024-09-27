import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CredixDeliveryOptionsComponent } from 'src/app/shared/components/credix-delivery-options/credix-delivery-options.component';

@Component({
  selector: 'renew-cards-page-component',
  templateUrl: './renew-cards.component.html',
  styleUrls: ['./renew-cards.component.scss']
})
export class RenewCardsPageComponent implements OnInit, AfterViewInit{
  @ViewChild(CredixDeliveryOptionsComponent) deliveryOptionsComponent: CredixDeliveryOptionsComponent;

  prefixColones = '₡';

  showSubmitSuccessNotification = false

  invalidAddress = true

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.deliveryOptionsComponent.DeliveryDetailsData$.subscribe((deliveryData) => {
      this.invalidAddress = !deliveryData.isValid
    })
  }

  submitRenovation(){
    if(this.invalidAddress) return

    this.showSubmitSuccessNotification = true
  }
}
