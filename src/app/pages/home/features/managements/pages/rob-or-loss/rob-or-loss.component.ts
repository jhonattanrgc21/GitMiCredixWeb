import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Card } from 'src/app/shared/models/card';
import { StorageService } from '../../../../../../core/services/storage.service';
import { CredixDeliveryOptionsComponent } from 'src/app/shared/components/credix-delivery-options/credix-delivery-options.component';
import { Router } from '@angular/router';
import { ManagementsService } from '../../managements.service';
import { UserManagementCosts } from 'src/app/shared/models/managements/costs';

@Component({
  selector: 'rob-or-loss',
  templateUrl: './rob-or-loss.component.html',
  styleUrls: ['./rob-or-loss.component.scss']
})
export class RobOrLossPageComponent implements OnInit{
  @ViewChild(CredixDeliveryOptionsComponent) deliveryOptionsComponent: CredixDeliveryOptionsComponent;
  @ViewChild('stepper') stepper: CdkStepper;

  managementCosts: UserManagementCosts;
  prefixColones = '₡';
  prefixDolares = '$';

  showStepper = false
  managementDone = false

  hideCardStep = false
  cards: Card[] = []

  reasonFormGroup = this.fb.group({
    replaceReason: ['', Validators.required],
    documentsWereRob: [null, Validators.required]
  });
  selectedCardsControl = this.fb.control(null, Validators.required);
  deliveryOptionControl = this.fb.control(null, Validators.required);
  stepperIndex = 0

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private managementsService: ManagementsService,
  ) { }

  ngOnInit(): void {

    this.managementsService.getManagementCosts().subscribe((userManagementCosts) => {
      if (userManagementCosts.type === 'success') {
        this.managementCosts = userManagementCosts
      }
    })

    this.cards = this.storageService.getCurrentCards()
    this.hideCardStep = this.cards.length <= 1

    if (this.hideCardStep) {
      this.selectedCardsControl.setValue(this.cards.map((card) => card.cardId))
    }
  }

  showStepperFunc() {
    this.showStepper = true
    setTimeout(() => {
      this.deliveryOptionsComponent.DeliveryDetailsData$.subscribe((deliveryData) => {
        if (deliveryData.isValid) {
          this.deliveryOptionControl.setValue(deliveryData.deliveryInfo)
        } else {
          this.deliveryOptionControl.setValue(null)
        }
      })
    }, 100)
  }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
  }
  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  selectedCardsChanged(cards: Card[]) {
    this.selectedCardsControl.setValue(cards.length > 0 ? cards.map((card) => card.cardId) : null)
  }

  submit() {
    if(
      this.reasonFormGroup.invalid ||
      this.selectedCardsControl.invalid ||
      this.deliveryOptionControl.invalid
    ) return

    this.managementsService.postCardReplacement(
      this.reasonFormGroup.controls['replaceReason']?.value,
      this.reasonFormGroup.controls['documentsWereRob']?.value,
      this.selectedCardsControl.value,
      this.deliveryOptionControl.value
    ).subscribe((response) => {
      console.log(response)
    })
  }

  goToManagementsList() {
    this.router.navigate(['/home/managements/my-managements'])
  }
}
