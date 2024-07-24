import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { AllowedMovement } from "../../models/allowed-movement";
import { Observable } from "rxjs";
import { CredixCheckboxButtonComponent } from "../credix-checkbox-button/credix-checkbox-button.component";

@Component({
  selector: "credix-allowed-movement",
  templateUrl: "./credix-allowed-movement.component.html",
  styleUrls: ["./credix-allowed-movement.component.scss"],
})
export class CredixAllowedMovementComponent implements OnInit, OnChanges {
  @Input() movement: AllowedMovement;
  @Input() selectedChanges: Observable<AllowedMovement[]>;
  @Input() lastItem: boolean;
  @Output() changeSelection = new EventEmitter<boolean>();
  disabled: boolean = false;
  @ViewChild(CredixCheckboxButtonComponent)
  checkboxComponent!: CredixCheckboxButtonComponent;

  constructor() {}

  ngOnInit(): void {}

  checkChanges(selected: AllowedMovement[]): void {
    if (selected.length > 0) {
      this.disabled =
        selected[0].promoDiscountMessage !==
          this.movement.promoDiscountMessage ||
        selected[0]?.originCurrency?.currencyId !==
          this.movement?.originCurrency?.currencyId;
    } else {
      this.disabled = false;
    }
  }

  ngOnChanges(): void {
    this.selectedChanges.subscribe((val) => {
      this.checkChanges(val);
    });
  }

  toggleCheckbox() {
    if (!this.disabled) {
      this.checkboxComponent.triggerCheckboxClick();
    }
  }

  change(checked: boolean) {
    this.changeSelection.emit(checked);
  }
}
