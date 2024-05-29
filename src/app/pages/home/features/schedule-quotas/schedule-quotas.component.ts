import { finalize, switchMap } from "rxjs/operators";
import {
  Currency,
  ProgrammedRule,
} from "./../../../../shared/models/programmed-rule";
import { CdkStepper } from "@angular/cdk/stepper";
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ScheduleQuotasService } from "./schedule-quotas.service";
import { ModalService } from "src/app/core/services/modal.service";
import { TagsService } from "src/app/core/services/tags.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Tag } from "src/app/shared/models/tag";
import { InformationPopupComponent } from "./information-popup/information-popup.component";
import { UpdatedRulePopupComponent } from "./updated-rule-popup/updated-rule-popup.component";

@Component({
  selector: "app-schedule-quotas",
  templateUrl: "./schedule-quotas.component.html",
  styleUrls: ["./schedule-quotas.component.scss"],
  providers: [DatePipe],
})
export class ScheduleQuotasComponent implements OnInit, AfterViewInit {
  currencyForm: FormGroup =  new FormGroup({
    disableNextStep: new FormControl(false, Validators.required),
  });
  colonesForm: FormGroup = new FormGroup({
    minimumAmount: new FormControl(null, Validators.required),
    maximumAmount: new FormControl(null, Validators.required),
    quotas: new FormControl(null, Validators.required),
    commissions: new FormControl(null, Validators.required),
    interest: new FormControl(null, Validators.required),
    initDate: new FormControl(null),
    endDate: new FormControl(null),
  });
  dollarsForm: FormGroup = new FormGroup({
    minimumAmount: new FormControl(null, Validators.required),
    maximumAmount: new FormControl(null, Validators.required),
    quotas: new FormControl(null, Validators.required),
    commissions: new FormControl(null, Validators.required),
    interest: new FormControl(null, Validators.required),
    initDate: new FormControl(null),
    endDate: new FormControl(null),
  });

  currencyList: Currency[];

  isColones: boolean = false;
  isDollars: boolean = false;
  selectedIndex = 0;
  disableButton = true;
  done = false;
  message: string;
  status: "success" | "error";
  title: string;
  info1: string;
  button: string;
  info2: string;
  info3: string;
  option1: string;
  option2: string;
  step: string;
  step2: string;
  step3: string;
  todayString: string;
  rulesList: ProgrammedRule[] = [];
  isActiveStepper: boolean = false;
  @ViewChild("scheduleQuotasStepper") stepper: CdkStepper;
  scheduleQuotasTitle: string;
  loading = true;

  constructor(
    private scheduleQuotasService: ScheduleQuotasService,
    private modalService: ModalService,
    private tagsService: TagsService,
    private datePipe: DatePipe
  ) {
    this.todayString = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.initForms();
  }

  ngOnInit(): void {
    this.tagsService
      .getAllFunctionalitiesAndTags()
      .subscribe((functionality) =>
        this.getTags(
          functionality.find((fun) => fun.description === "Programar cuotas")
            .tags
        )
      );
    this.scheduleQuotasService
      .getRuleList()
      .subscribe((res: ProgrammedRule[]) => {
        this.rulesList = res;
        this.loading = false;
      });
    this.scheduleQuotasService.getRuleQuotaList().subscribe((value) => {
      this.scheduleQuotasService.ruleQuotaList.next({
        colonesQuotas: value?.colones,
        dollarsQuotas: value?.dolares,
        minimumAmountColones: value.minimumAmountColones,
        maximumAmountColones: value.maximumAmountColones,
        minimumAmountDollars: value.minimumAmountDollars,
        maximumAmountDollars: value.maximumAmountDollars,
      });
    });
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  initForms() {
    this.currencyForm = new FormGroup({
      disableNextStep: new FormControl(false, Validators.required),
    });
    this.colonesForm = new FormGroup({
      id: new FormControl(null),
      minimumAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      maximumAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null),
      endDate: new FormControl(null),
      isActive: new FormControl(null),
    });
    this.dollarsForm = new FormGroup({
      id: new FormControl(null),
      minimumAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      maximumAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null),
      endDate: new FormControl(null),
      isActive: new FormControl(null),
    });
  }

  setIsColones(value: boolean) {
    this.isColones = value;
  }
  setIsDollars(value: boolean) {
    this.isDollars = value;
  }

  existRules(): boolean {
    return this.rulesList.length > 0;
  }

  activeStepper(value: boolean) {
    this.isActiveStepper = value;
  }

  canNotAdvance(): boolean {
    return this.colonesForm.invalid || this.dollarsForm.invalid;
  }

  setEnableButton() {
    switch (this.selectedIndex) {
      case 0:
        this.currencyList = [
          {
            code: 188,
            description: "Colones",
            isSelected: false,
          },
          {
            code: 840,
            description: "Dólares",
            isSelected: false,
          },
        ];
        this.initForms();
        this.isColones = false;
        this.isDollars = false;
        this.currencyForm.valueChanges.subscribe(() => {
          this.disableButton = this.currencyForm.get("disableNextStep").value;
        });
        if (this.isColones || this.isDollars) this.disableButton = false;
        break;
      case 1:
        let minColones = 0,
          maxColones = 0,
          minDollars = 0,
          maxDollars = 0;
        if (this.isColones && this.isDollars) {
          this.disableButton =
            this.colonesForm.invalid || this.dollarsForm.invalid;
          // En este caso, ambos isColones y isDollars son true, por lo que verificamos la condición en conjunto de ambos formularios.
          this.colonesForm.valueChanges.subscribe(() => {
            minColones = this.colonesForm.value.minimumAmount
              ? Number(this.colonesForm.value.minimumAmount)
              : 0;
            maxColones = this.colonesForm.value.maximumAmount
              ? Number(this.colonesForm.value.maximumAmount)
              : 0;
            this.disableButton =
              minColones > maxColones ||
              this.colonesForm.invalid ||
              minDollars > maxDollars ||
              this.dollarsForm.invalid;
          });

          this.dollarsForm.valueChanges.subscribe(() => {
            minDollars = this.dollarsForm.value.minimumAmount
              ? Number(this.dollarsForm.value.minimumAmount)
              : 0;
            maxDollars = this.dollarsForm.value.maximumAmount
              ? Number(this.dollarsForm.value.maximumAmount)
              : 0;
            this.disableButton =
              minColones > maxColones ||
              this.colonesForm.invalid ||
              minDollars > maxDollars ||
              this.dollarsForm.invalid;
          });
        } else {
          if (this.isColones) {
            this.disableButton = this.colonesForm.invalid;
            this.colonesForm.valueChanges.subscribe(() => {
              let min = this.colonesForm.value.minimumAmount
                ? Number(this.colonesForm.value.minimumAmount)
                : 0;
              let max = this.colonesForm.value.maximumAmount
                ? Number(this.colonesForm.value.maximumAmount)
                : 0;
              this.disableButton = min > max || min == max || this.colonesForm.invalid;
            });
          }

          if (this.isDollars) {
            this.disableButton = this.dollarsForm.invalid;
            this.dollarsForm.valueChanges.subscribe(() => {
              let min = this.dollarsForm.value.minimumAmount
                ? Number(this.dollarsForm.value.minimumAmount)
                : 0;
              let max = this.dollarsForm.value.maximumAmount
                ? Number(this.dollarsForm.value.maximumAmount)
                : 0;
              this.disableButton = min > max || min == max || this.dollarsForm.invalid;
            });
          }
        }

        break;
      case 2:
        this.disableButton = false;
        break;
    }
  }

  next() {
    if (this.selectedIndex < 3) {
      this.stepper.next();
      this.selectedIndex++;
      this.disableButton = false;
    }

    if (this.selectedIndex === 3) {
      this.openConfirmationModal(1);
    }

    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, "dd/MM/yyyy");
  }

  editRule(rule: ProgrammedRule, typeEvent: number) {
    if (typeEvent == 1) this.openConfirmationModal(2, rule);
  }

  disableRule(rule: ProgrammedRule, typeEvent: number) {
    if (typeEvent == 2) {
      if (rule.currencyId == 188) {
        this.colonesForm.get("id").setValue(rule.id);
        this.colonesForm
          .get("minimumAmount")
          .setValue(rule.amountRange.split("-")[0]);
        this.colonesForm
          .get("maximumAmount")
          .setValue(rule.amountRange.split("-")[1]);
        this.colonesForm.get("quotas").setValue(rule.quota);
        this.colonesForm
          .get("commissions")
          .setValue(rule.listQuota.commissionRate);
        this.colonesForm.get("interest").setValue(rule.listQuota.feePercentage);
        this.colonesForm.get("initDate").setValue(new Date(rule.initDate));
        this.colonesForm
          .get("endDate")
          .setValue(rule.endDate ? new Date(rule.endDate) : null);
        this.colonesForm.get("isActive").setValue(rule.isActive);
      } else {
        this.dollarsForm.get("id").setValue(rule.id);
        this.dollarsForm
          .get("minimumAmount")
          .setValue(rule.amountRange.split("-")[0]);
        this.dollarsForm
          .get("maximumAmount")
          .setValue(rule.amountRange.split("-")[1]);
        this.dollarsForm.get("quotas").setValue(rule.quota);
        this.dollarsForm
          .get("commissions")
          .setValue(rule.listQuota.commissionRate);
        this.dollarsForm.get("interest").setValue(rule.listQuota.feePercentage);
        this.dollarsForm.get("initDate").setValue(new Date(rule.initDate));
        this.dollarsForm
          .get("endDate")
          .setValue(rule.endDate ? new Date(rule.endDate) : null);
        this.dollarsForm.get("isActive").setValue(rule.isActive);
      }

      this.scheduleQuotasService
        .saveExtendTermRule(this.colonesForm, this.dollarsForm)
        .pipe(switchMap(() => this.scheduleQuotasService.getRuleList()))
        .subscribe((res: ProgrammedRule[]) => {
          this.rulesList = res;
          this.colonesForm.reset();
          this.dollarsForm.reset();
        });
    }
  }

  openConfirmationModal(typeModal: number, rule?: ProgrammedRule) {
    switch (typeModal) {
      case 1:
        this.modalService
          .confirmationPopup("¿Desea establecer esta regla?")
          .subscribe((confirmation) => {
            if (confirmation) {
              this.scheduleQuotasService
                .saveExtendTermRule(this.colonesForm, this.dollarsForm)
                .pipe(finalize(() => (this.done = true)))
                .subscribe({
                  next: (res) => {
                    this.title = res?.title;
                    this.status = res.type;
                    this.message = res?.message;
                  },
                });
            } else {
              this.selectedIndex = 2;
            }
          });
        break;
      case 2:
        this.modalService
          .confirmationPopup("¿Desea editar esta regla?")
          .subscribe((confirmation) => {
            if (confirmation) {
              this.currencyForm.get("disableNextStep").setValue(false);
              if (rule.currencyId == 188) {
                this.colonesForm.get("id").setValue(rule.id);
                this.colonesForm
                  .get("minimumAmount")
                  .setValue(rule.amountRange.split("-")[0]);
                this.colonesForm
                  .get("maximumAmount")
                  .setValue(rule.amountRange.split("-")[1]);
                this.colonesForm.get("quotas").setValue(rule.quota);
                this.colonesForm
                  .get("commissions")
                  .setValue(rule.listQuota.commissionRate);
                this.colonesForm
                  .get("interest")
                  .setValue(rule.listQuota.feePercentage);
                this.colonesForm
                  .get("initDate")
                  .setValue(new Date(rule.initDate));
                this.colonesForm
                  .get("endDate")
                  .setValue(rule.endDate ? new Date(rule.endDate) : null);
                this.colonesForm.get("isActive").setValue(rule.isActive);
                this.isColones = true;
                this.currencyList[0].isSelected = true;
              } else {
                this.dollarsForm.get("id").setValue(rule.id);
                this.dollarsForm
                  .get("minimumAmount")
                  .setValue(rule.amountRange.split("-")[0]);
                this.dollarsForm
                  .get("maximumAmount")
                  .setValue(rule.amountRange.split("-")[1]);
                this.dollarsForm.get("quotas").setValue(rule.quota);
                this.dollarsForm
                  .get("commissions")
                  .setValue(rule.listQuota.commissionRate);
                this.dollarsForm
                  .get("interest")
                  .setValue(rule.listQuota.feePercentage);
                this.dollarsForm
                  .get("initDate")
                  .setValue(new Date(rule.initDate));
                this.dollarsForm
                  .get("endDate")
                  .setValue(rule.endDate ? new Date(rule.endDate) : null);
                this.dollarsForm.get("isActive").setValue(rule.isActive);
                this.isDollars = true;
                this.currencyList[1].isSelected = true;
              }
              this.activeStepper(true);
              setTimeout(() => {
                this.disableButton = false;
                this.next();
              }, 1000);
            }
          });
        break;
    }
  }

  openInformationModal() {
    this.modalService
      .open(
        {
          component: InformationPopupComponent,
          hideCloseButton: true,
          title: "Programar cuotas",
        },
        {
          width: 343,
          height: 519,
          disableClose: false,
          panelClass: "schedule-quotas-information-panel",
        }
      )
      .afterClosed()
      .subscribe();
  }

  openUpdatedRuleModal() {
    this.modalService
      .open(
        {
          component: UpdatedRulePopupComponent,
          hideCloseButton: false,
          title: null,
        },
        {
          width: 343,
          height: 400,
          disableClose: false,
          panelClass: "schedule-quotas-updatedRule-panel",
        }
      )
      .afterClosed()
      .subscribe();
  }

  editBack() {
    this.back();
  }

  getTags(tags: Tag[]) {
    this.info1 = tags.find(
      (tag) => tag.description === "programarcuotas.info1"
    )?.value;
    this.button = tags.find(
      (tag) => tag.description === "programarcuotas.button"
    )?.value;
    this.option1 = tags.find(
      (tag) => tag.description === "programarcuotas.option1"
    )?.value;
    this.option2 = tags.find(
      (tag) => tag.description === "programarcuotas.option2"
    )?.value;
    this.info2 = tags.find(
      (tag) => tag.description === "programarcuotas.info2"
    )?.value;
    this.info3 = tags.find(
      (tag) => tag.description === "programarcuotas.info3"
    )?.value;
    this.step = tags.find(
      (tag) => tag.description === "programarcuotas.stepper1"
    )?.value;
    this.step2 = tags.find(
      (tag) => tag.description === "programarcuotas.stepper2"
    )?.value;
    this.step3 = tags.find(
      (tag) => tag.description === "programarcuotas.stepper3"
    )?.value;
    this.scheduleQuotasTitle = tags.find(
      (tag) => tag.description === "programarcuotas.title"
    )?.value;
  }

  reload() {
    this.done = false;
    this.activeStepper(false);
    this.selectedIndex = 0;
    this.setEnableButton();
    this.ngOnInit();
  }
}
