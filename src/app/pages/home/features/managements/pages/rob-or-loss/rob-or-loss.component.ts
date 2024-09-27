import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Card } from 'src/app/shared/models/card';
import { StorageService } from '../../../../../../core/services/storage.service';
import { CredixDeliveryOptionsComponent } from 'src/app/shared/components/credix-delivery-options/credix-delivery-options.component';
import { Router } from '@angular/router';

@Component({
  selector: 'rob-or-loss',
  templateUrl: './rob-or-loss.component.html',
  styleUrls: ['./rob-or-loss.component.scss']
})
export class RobOrLossPageComponent implements OnInit, AfterViewInit {
  @ViewChild(CredixDeliveryOptionsComponent) deliveryOptionsComponent: CredixDeliveryOptionsComponent;
  @ViewChild('stepper') stepper: CdkStepper;
  prefixColones = '₡';
  prefixDolares = '$';

  managementDone = true

  hideCardStep = false
  cards: Card[] = []

  replaceReasonOptions = [
    'Robo',
    'Extravio'
  ]

  reasonFormGroup = this.fb.group({
    replaceReason: ['', Validators.required],
    documentsWereRob: [null, Validators.required]
  });
  selectedCardsControl = this.fb.control(null, Validators.required);
  deliveryOptionControl = this.fb.control(null, Validators.required);
  stepperIndex = 0

  constructor(private fb: FormBuilder, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.cards = this.storageService.getCurrentCards()
    this.hideCardStep = this.cards.length <= 1

    if(this.hideCardStep){
      this.selectedCardsControl.setValue(this.cards)
    }
  }

  ngAfterViewInit(): void {
    this.deliveryOptionsComponent.DeliveryDetailsData$.subscribe((deliveryData) => {
      if(deliveryData.isValid){
        this.deliveryOptionControl.setValue(deliveryData)
      } else {
        this.deliveryOptionControl.setValue(null)
      }
    })
  }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
  }
  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  selectedCardsChanged(cards: Card[]){
    this.selectedCardsControl.setValue( cards.length > 0 ? cards : null )
  }

  submit(){
    this.managementDone = true
  }

  goToManagementsList(){
    this.router.navigate(['/home/managements/my-managements'])
  }
}
