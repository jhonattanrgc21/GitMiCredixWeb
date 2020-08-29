import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import {ConvertStringDateToDate} from '../../utils';


@Component({
  // tslint:disable-next-line:component-selector
  selector: "credix-navigation-table",
  templateUrl: "./credix-navigation-table.component.html",
  styleUrls: ["./credix-navigation-table.component.scss"],
})
export class CredixNavigationTableComponent implements OnInit {
  @Input() headers = ["", ""];
  @Input() options = [];
  @Input() type: string;
  @Output() optionEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() quotaEvent: EventEmitter<any> = new EventEmitter<any>();
  optionsScroll = {autoHide: false, scrollbarMinSize: 100};
  optionSelected = {
    id: 0,
    name: "",
    icon: "",
    img: "",
    cardId: 0,
    totalPlanQuota: 0,
    accountNumber: 0,
    movementId: "",
    originDate: "",
    originAmount: "",
    originCurrency: "",
    quotaAmount: 0,
    subOptions: [],
    restrictions: {
      linkFacebook: "",
      name: "",
      paymentPlaceRestriction: [],
      webPage: "",
    },
  };
  quotas = 6;
  changedQuotas = {
    feeAmount: "0",
    feePercentage: 0,
    quotaTo: 6,
    amountPerQuota: "0",
    quotaFrom: 3,
    financedPlan: 0,
    purchaseAmount: "0",
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  optionClick(option) {
    this.optionSelected = option;
    this.changedQuotas = this.optionSelected.subOptions.find(
      (el) => el.quotaTo === this.quotas
    );
    this.optionEvent.emit(this.optionSelected);
    this.quotaEvent.emit(this.changedQuotas);
  }

  subOptionClick(navigation: string) {
    this.router.navigate([navigation]);
  }

  convertStringDateToDate(value: string): Date {
    return ConvertStringDateToDate(value);
  }

  changeQuotas(e) {
    this.quotas = e;
    this.changedQuotas = this.optionSelected.subOptions.find(
      (el) => el.quotaTo === e
    );
    this.quotaEvent.emit(this.changedQuotas);
  }
}
