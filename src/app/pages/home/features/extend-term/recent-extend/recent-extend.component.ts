import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ModalService } from "src/app/core/services/modal.service";
import { PaymentQuota } from "src/app/shared/models/payment-quota";
import { ExtendTermService } from "../extend-term.service";
import { TagsService } from "src/app/core/services/tags.service";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { ConvertStringAmountToNumber } from "src/app/shared/utils";
import { ConvertNumberToStringAmount } from "src/app/shared/utils/convert-number-to-string-amount";
import { Tag } from "src/app/shared/models/tag";
import { AllowedMovement } from "src/app/shared/models/allowed-movement";

@Component({
  selector: "app-recent-extend",
  templateUrl: "./recent-extend.component.html",
  styleUrls: ["./recent-extend.component.scss"],
})
export class RecentExtendComponent implements OnInit, OnDestroy {
  comissionTag: string;
  subtitleTag: string;
  disclaTag: string;
  dateTag: string;
  quotaTag: string;
  deseoTag: string;
  newQuota: string;
  resultNew: string;
  question: string;

  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderMin = 1;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;
  movementsSelected: AllowedMovement[];
  quotas: PaymentQuota[];
  movementQuotaSummary: PaymentQuota = null;
  purchaseAmount: string = "";
  percentageCommission: string = "";
  feedPercentage: any;
  result: any;
  quotaPromoMin: number;
  quotaPromoMax: number;
  singleMovement: AllowedMovement;
  promoApply: boolean;
  promoMessage: string;
  summaryPrefix = "₡";

  @ViewChild("summaryTemplate") summaryTemplate: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    private extendTermService: ExtendTermService,
    private tagsService: TagsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.extendTermService.recentMovementsSelected.length <= 0) {
      this.router.navigate(["/home/extend-term"]);
    }

    this.movementsSelected = this.extendTermService.recentMovementsSelected;
    this.tagsService
      .getAllFunctionalitiesAndTags()
      .subscribe((functionality) =>
        this.getTags(
          functionality.find(
            (fun) => fun.description === "Ampliar plazo de compra"
          ).tags
        )
      );
    this.getQuotas();
  }

  getQuotas() {
    if (this.movementsSelected.length > 1) {
      this.getQuotasUnified();
      this.singleMovement = undefined;
    } else {
      this.getQuotasSingleMovement();
    }
    let dollar =
      this.movementsSelected.length > 0 &&
      this.movementsSelected.every(
        (el) => el.originCurrency.currencyId === 840
      );
    this.summaryPrefix = dollar ? "$" : "₡";
  }

  getQuotasUnified() {
    this.extendTermService
      .calculateQuotaByMovementUnified(this.movementsSelected, 4007)
      .pipe(finalize(() => this.selectMovementQuotaSummary()))
      .subscribe((response) => {
        if (response.listQuota.length > 0) {
          this.purchaseAmount = response.purchaseAmount;
          this.quotas = response.listQuota.sort(
            (a, b) => a.quotaTo - b.quotaTo
          );
          this.termSliderDisplayMin = this.quotas[0].quotaTo;
          this.termSliderMin = 1;
          this.termSliderDisplayMax =
            this.quotas[this.quotas.length - 1].quotaTo;
          this.termSliderMax = this.quotas.length;
          this.termSliderDisplayValue = this.termSliderDisplayMin;
          this.quotaPromoMax = this.extendTermService.quotaPromoMax
            ? this.extendTermService.quotaPromoMax
            : undefined;
          this.promoApply = !!this.quotaPromoMax;
          this.promoMessage = this.movementsSelected[0].promoDiscountMessage;

          const commission = ConvertStringAmountToNumber(
            this.quotas[1].commissionAmount
          );

          const aux = [...this.quotas];

          aux.shift();

          this.result = aux.find(
            (quota) =>
              ConvertStringAmountToNumber(quota.commissionAmount) !== commission
          );
        }
      });
  }

  getQuotasSingleMovement() {
    this.extendTermService
      .calculateQuotaByMovement(this.movementsSelected[0].movementId, 1004)
      .pipe(
        finalize(() => {
          this.selectMovementQuotaSummary();
        })
      )
      .subscribe((response) => {
        if (response.length > 0) {
          this.singleMovement = this.movementsSelected[0];
          this.promoApply = this.singleMovement.promoApply;
          this.promoMessage = this.singleMovement.promoDiscountMessage;
          this.quotas = response;
          this.quotaPromoMin = this.extendTermService.quotaPromoMin
            ? this.extendTermService.quotaPromoMin
            : undefined;
          this.quotaPromoMax = this.extendTermService.quotaPromoMax
            ? this.extendTermService.quotaPromoMax
            : undefined;
          this.initSlider();
        }
      });
  }

  initSlider() {
    this.termSliderDisplayMin = this.quotas[0].quotaTo;
    this.termSliderMin = 1;
    this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
    this.termSliderMax = this.quotas.length;
    this.termSliderDisplayValue = this.termSliderDisplayMin;
  }

  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.selectMovementQuotaSummary();
  }

  selectMovementQuotaSummary() {
    this.movementQuotaSummary = this.quotas.find(
      (value) => value.quotaTo === this.termSliderDisplayValue
    );
    this.feedPercentage =
      this.convertAmountValue(this.movementQuotaSummary.feePercentage) == 0
        ? "0"
        : this.movementQuotaSummary?.feePercentage;
    this.percentageCommission =
      this.movementQuotaSummary?.commissionPercentage === "0,00"
        ? "0"
        : this.movementQuotaSummary?.commissionPercentage;
  }

  convertAmountValue(value: any): any {
    let result: any = "";

    if (typeof value === "number") {
      result = ConvertNumberToStringAmount(value);
    } else {
      result = ConvertStringAmountToNumber(value);
    }

    return result;
  }

  openConfirmationModal() {
    this.modalService
      .confirmationPopup("¿Desea ampliar el plazo?")
      .subscribe((confirmation) => {
        if (confirmation) {
          if (this.movementsSelected.length > 1) {
            this.saveQuotaUnified();
          } else {
            this.saveQuota();
          }
        }
      });
  }

  saveQuota() {
    this.extendTermService
      .saveNewQuota(
        this.singleMovement.cardId,
        ConvertStringAmountToNumber(this.movementQuotaSummary.commissionAmount),
        this.movementQuotaSummary.quotaTo,
        this.singleMovement.movementId
      )
      .pipe(
        finalize(() =>
          this.router.navigate([
            `/home/extend-term/establishment/${this.singleMovement.establishmentName.trim()}/success`,
          ])
        )
      )
      .subscribe((response) => {
        this.extendTermService.result = {
          status: response.type,
          message: response.message,
        };

        this.extendTermService.newQuota = {
          establishment: this.singleMovement.establishmentName.trim(),
          currency: this.singleMovement.originCurrency.currency,
          amount: this.movementQuotaSummary.amountPerQuota,
          quota: this.movementQuotaSummary.quotaTo,
          movements: this.movementsSelected,
        };
      });
  }

  saveQuotaUnified() {
    this.extendTermService
      .saveNewQuotaUnified(
        this.movementsSelected[0].cardId,
        ConvertStringAmountToNumber(this.movementQuotaSummary.commissionAmount),
        this.movementQuotaSummary.quotaTo,
        this.movementsSelected
      )
      .pipe(
        finalize(() =>
          this.router.navigate([
            `/home/extend-term/establishment/${this.movementsSelected[0].establishmentName.trim()}/success`,
          ])
        )
      )
      .subscribe((response) => {
        this.extendTermService.result = {
          status: response.type === "success" ? "success" : "error",
          message: response.message,
        };

        this.extendTermService.newQuota = {
          establishment: this.movementsSelected[0].establishmentName.trim(),
          currency: this.movementsSelected.every(
            (mov) => mov.originCurrency.currencyId == 840
          )
            ? "$"
            : "₡",
          amount: this.movementQuotaSummary.amountPerQuota,
          quota: this.movementQuotaSummary.quotaTo,
          movements: this.movementsSelected,
        };
        this.extendTermService.recentMovementsSelected = [];
      });
  }

  openSummary() {
    this.modalService.open(
      {
        template: this.summaryTemplate,
        title: "Resumen general",
      },
      {
        width: 380,
        height: 395,
        disableClose: true,
        panelClass: "summary-panel",
      }
    );
  }

  getTags(tags: Tag[]) {
    this.comissionTag = tags.find(
      (tag) => tag.description === "ampliar.tag.comision"
    )?.value;
    this.subtitleTag = tags.find(
      (tag) => tag.description === "ampliar.subtitle"
    )?.value;
    this.disclaTag = tags.find(
      (tag) => tag.description === "ampliar.disclaimer"
    )?.value;
    this.dateTag = tags.find(
      (tag) => tag.description === "ampliar.result.fecha"
    )?.value;
    this.quotaTag = tags.find(
      (tag) => tag.description === "ampliar.tag.cuota"
    )?.value;
    this.deseoTag = tags.find(
      (tag) => tag.description === "ampliar.tag.deseo"
    )?.value;
    this.newQuota = tags.find(
      (tag) => tag.description === "ampliar.tag.nuevacuota"
    )?.value;
    this.resultNew = tags.find(
      (tag) => tag.description === "ampliar.result.nuevoplazo"
    )?.value;
    this.question = tags.find(
      (tag) => tag.description === "ampliar.question"
    )?.value;
  }

  ngOnDestroy(): void {
    this.extendTermService.recentMovementsSelected = [];
  }
}
