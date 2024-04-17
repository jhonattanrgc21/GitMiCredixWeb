import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ModalService } from "../../../../../core/services/modal.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "../../../../../core/services/storage.service";
import { ConvertStringAmountToNumber } from "../../../../../shared/utils";
import { TagsService } from "../../../../../core/services/tags.service";
import { Tag } from "../../../../../shared/models/tag";
import { filter, finalize, map, takeUntil } from "rxjs/operators";
import { ExtendTermQuota } from "../../../../../shared/models/extend-term-quota";
import { AllowedMovement } from "../../../../../shared/models/allowed-movement";
import { ExtendTermService } from "../extend-term.service";
import { CredixSliderComponent } from "src/app/shared/components/credix-slider/credix-slider.component";
import { ConvertNumberToStringAmount } from "src/app/shared/utils/convert-number-to-string-amount";
import { PopupPromoComponent } from "../popup-promo/popup-promo.component";
import { Observable, combineLatest, forkJoin } from "rxjs";
import { CredixMasPopupComponent } from "../credix-mas-popup/credix-mas-popup.component";
import { SliderPopupComponent } from "../slider-popup/slider-popup.component";

@Component({
  selector: "app-recent-purchases",
  templateUrl: "./recent-purchases.component.html",
  styleUrls: ["./recent-purchases.component.scss"],
})
export class RecentPurchasesComponent implements OnInit {
  selection: string[] = [];
  displayedColumns: string[] = [
    "select",
    "date",
    "commerce",
    "quotas",
    "amount",
  ];
  allowedMovementSelected: AllowedMovement[] = [];
  allowedMovements: AllowedMovement[] = [];
  movementIdParam: string;
  quotaSelected: ExtendTermQuota;
  message = "El plazo de su compra ha sido extendido correctamente.";
  status: "success" | "error";
  done = false;
  empty = false;
  comisionTag: string;
  subtitle: string;
  question: string;
  titleTag: string;
  disclaTag: string;
  monthTag: string;
  warningTag: string;
  dateTag: string;
  quotaTag: string;
  deseoTag: string;
  newQuota: string;
  resultNew: string;
  title: string;
  amountArray: { amount: number; movementId: string }[] = [];
  amountSummary = "0";
  summaryPrefix = 188;
  minAmountDollars = 0;
  minAmountColones = 0;
  buttonDisable = true;
  iva: number;
  percentageCommission: string;
  commissionMonthly: string = "";
  feedPercentage: string;
  comissionUnique: boolean = false;
  quotaPromoMin = 0;
  quotaPromoMax = 0;
  today: Date;
  private counterPromo = 0;

  @ViewChild("disabledTemplate") disabledTemplate: TemplateRef<any>;
  template: TemplateRef<any>;
  @ViewChild(CredixSliderComponent) credixSlider: CredixSliderComponent;
  selectedChanges: Observable<AllowedMovement[]> = new Observable();

  constructor(
    private extendTermService: ExtendTermService,
    private storageService: StorageService,
    private tagsService: TagsService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.checkCutDate();
    this.getAllowedMovements();
    this.tagsService
      .getAllFunctionalitiesAndTags()
      .subscribe((functionality) =>
        this.getTags(
          functionality.find(
            (fun) => fun.description === "Ampliar plazo de compra"
          ).tags
        )
      );
    this.allowedMovementState();
  }

  checkMovementParam(mov: any) {
    if (mov) {
      this.movementIdParam = mov;
      this.allowedMovementSelected.push(
        this.allowedMovements.find(
          (allowedMovement) =>
            allowedMovement.movementId === this.movementIdParam
        )
      );
      this.next();
    }
  }

  checkCutDate() {
    this.extendTermService.checkCutDate().subscribe((response) => {
      if (!response.status) {
        this.message = response.descriptionOne;
        this.title = response.titleOne;
        this.done = true;
        this.template = this.disabledTemplate;
      }
    });
  }

  allowedMovementState() {
    combineLatest(
      this.extendTermService.$allowedMovement,
      this.extendTermService.$promoFilter
    )
      .pipe(
        map(([allowedMovementState, filterPromoState]) => {
          const allowedMovementAux: AllowedMovement[] =
            allowedMovementState.map((values, index) => {
              return {
                originAmount: values.originAmount,
                originCurrency: values.originCurrency,
                establishmentName: values.establishmentName,
                amount: values.amount,
                cardId: values.cardId,
                totalPlanQuota: values.totalPlanQuota,
                accountNumber: values.accountNumber,
                movementId: values.movementId,
                originDate: values.originDate,
                promoApply: values.promoApply ? values.promoApply : false,
                promoMessage: values.promoMessage ? values.promoMessage : "",
                promoDiscountMessage: values.promoDiscountMessage
                  ? values.promoDiscountMessage
                  : "",
              };
            });

          const promoFilterAuxArr = allowedMovementAux.filter(
            (obj) => obj.promoApply
          );
          if (promoFilterAuxArr.length === allowedMovementAux.length) {
            this.extendTermService.setDisabledCheckBox(true);
          }

          if (filterPromoState) {
            console.log("filtrando");
            return allowedMovementAux.filter((obj) => obj.promoApply);
          } else {
            console.log("sin filtrar");
            return allowedMovementAux;
          }
        })
      )
      .subscribe((response) => {
        this.allowedMovements = response;
      });
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

  getAllowedMovements() {
    this.extendTermService
      .getAllowedMovements(1004)
      .pipe()
      .subscribe((response) => {
        if (response?.result) {
          const credixMas = response.credixMas;
          const promo = response.promo;
          this.showModals(promo, credixMas, response);
          this.empty = false;
        } else {
          this.empty = true;
        }
      });
  }

  calculateTotalAmountSelect() {
    let totalAmount = 0;
    const dollar =
      this.allowedMovementSelected.length > 0 &&
      this.allowedMovementSelected[0].originCurrency.currencyId === 840;
    console.log(dollar);
    interface amountObject {
      amount: number;
      movementId: string;
    }
    let mappedArray = this.allowedMovementSelected.map(
      (movement) =>
        <amountObject>{
          amount: ConvertStringAmountToNumber(
            dollar ? movement.originAmount : movement.amount
          ),
          movementId: movement.movementId,
        }
    );
    totalAmount = mappedArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    this.amountSummary = ConvertNumberToStringAmount(totalAmount);
    //dollar ? "$" : "₡";
    this.summaryPrefix =  (this.allowedMovementSelected[0]?.originCurrency?.currencyId ?? 188);
    this.buttonDisable = dollar
      ? totalAmount < this.minAmountDollars
      : totalAmount < this.minAmountColones;
  }

  change($event, movement) {
    if ($event) {
      this.selection.push(movement.movementId);
      this.allowedMovementSelected.push(movement);
    } else {
      this.selection.splice(
        this.selection.findIndex((mov) => mov === movement.movementId),
        1
      );
      this.allowedMovementSelected.splice(
        this.allowedMovementSelected.findIndex(
          (mov) => mov.movementId == movement.movementId
        ),
        1
      );
    }
    this.calculateTotalAmountSelect();
    this.selectedChanges = new Observable((obs) => {
      obs.next(this.allowedMovementSelected);
    });
  }

  next() {
    this.extendTermService.recentMovementsSelected = [
      ...this.allowedMovementSelected,
    ];
    this.router.navigate(["/home/extend-term/recent-extend"]);
  }

  getTags(tags: Tag[]) {
    this.comisionTag = tags.find(
      (tag) => tag.description === "ampliar.tag.comision"
    )?.value;
    this.subtitle = tags.find(
      (tag) => tag.description === "ampliar.subtitle"
    )?.value;
    this.question = tags.find(
      (tag) => tag.description === "ampliar.question"
    )?.value;
    this.titleTag = tags.find(
      (tag) => tag.description === "ampliar.title"
    )?.value;
    this.disclaTag = tags.find(
      (tag) => tag.description === "ampliar.disclaimer"
    )?.value;
    this.monthTag = tags.find(
      (tag) => tag.description === "ampliar.tag.meses"
    )?.value;
    this.warningTag = tags.find(
      (tag) => tag.description === "ampliar.message.warning"
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
  }

  ngOnDestroy(): void {
    this.extendTermService.unsubscribe();
    this.counterPromo = 0;
  }

  openModalPromo(promoDescription: string, promoMessage: string) {
    console.log(screen.height);
    this.modalService.open(
      {
        data: {
          promoDescription,
          promoMessage,
        },
        hideCloseButton: true,
        component: PopupPromoComponent,
      },
      {
        width: 343,
        height: 390,
        disableClose: false,
        panelClass: "promo-popup",
      },
      1
    );
  }

  openModalCredixMas(credixMasTitle: string, credixMasText: string) {
    console.log(screen.height);
    credixMasTitle = "Extienda el plazo de sus compras sin pagar comisión";
    credixMasText =
      "Con Credix Más, disfrute de 0% de comisión al ampliar el plazo de sus compras a 3 o 6 cuotas cero interés. Y lo mejor, ¡no hay límites!. Suscríbase y aproveche esta increíble ventaja ahora";
    this.modalService.open(
      {
        data: {
          credixMasTitle,
          credixMasText,
        },
        hideCloseButton: true,
        component: CredixMasPopupComponent,
      },
      {
        width: 343,
        disableClose: false,
        panelClass: "promo-popup",
      },
      1
    );
  }

  openSliderModal(
    credixMasTitle: string,
    credixMasText: string,
    promoMessage: string,
    promoDescription
  ) {
    console.log(screen.height);
    credixMasTitle = "Extienda el plazo de sus compras sin pagar comisión";
    credixMasText =
      "Con Credix Más, disfrute de 0% de comisión al ampliar el plazo de sus compras a 3 o 6 cuotas cero interés. Y lo mejor, ¡no hay límites!. Suscríbase y aproveche esta increíble ventaja ahora";
    promoMessage = "Traslade una compra a 3 cuotas cero interes sin comision";
    promoDescription =
      "¡Aproveche! Del 02/06/23 al 08/07/23 puede cambiar el plazo de un consumo a 3 cuotas cero interes sin ningun costo";
    this.modalService.open(
      {
        data: {
          credixMasTitle,
          credixMasText,
          promoMessage,
          promoDescription,
        },
        hideCloseButton: true,
        component: SliderPopupComponent,
      },
      {
        width: 343,
        // height: 390,
        disableClose: false,
        panelClass: "promo-popup-panel",
      },
      1
    );
  }

  showModals(promo: boolean, credixMas: boolean, response: any) {
    if (!credixMas) {
      this.modalService.showModalInfo("credixmas-extend").subscribe((value) => {
        credixMas = value;
        if (credixMas && promo) {
          this.openSliderModal(
            response.credixMasTitle,
            response.credixMasText,
            response.promoMessage,
            response.promoDescription
          );
        } else if (credixMas) {
          this.openModalCredixMas(
            response.credixMasTitle,
            response.credixMasText
          );
        } else if (promo) {
          this.openModalPromo(response.promoDescription, response.promoMessage);
        }
      });
    } else if (promo) {
      this.openModalPromo(response.promoDescription, response.promoMessage);
    }
  }
}
