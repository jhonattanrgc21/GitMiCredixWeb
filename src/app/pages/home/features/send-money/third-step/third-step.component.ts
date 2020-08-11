import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { FavoriteIbanAccount } from "../../../../../shared/models/favorite-iban-account";
import { SendMoneyService } from "../send-money.service";

@Component({
  selector: "app-third-step",
  templateUrl: "./third-step.component.html",
  styleUrls: ["./third-step.component.scss"],
})
export class ThirdStepComponent implements OnInit, OnChanges {
  @Input() codeControl: FormControl = new FormControl(null);
  @Input() account: FavoriteIbanAccount;
  @Input() timeLimit: number;
  @Input() amount: number;
  @Input() commissionRate: number;
  @Input() currencyPrefix: string;
  @Output() totalEmitEvent = new EventEmitter();
  @Input() commission: number;
  quotaAmountView: number;
  total:number;
  iva:number;

  constructor(private sendMoneyService: SendMoneyService) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.amount && this.timeLimit) {
      this.quotaAmountView = Number(
        (+this.amount / +this.timeLimit).toFixed(2)
      );
    } else {
      this.quotaAmountView = 0;
    }

    this.iva = this.commission * 0.13;
    this.total = this.quotaAmountView + this.commission + this.iva;
    this.totalEmitEvent.emit(this.total);
  }

}
