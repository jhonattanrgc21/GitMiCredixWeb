import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CdkStepper } from "@angular/cdk/stepper";
import { SendMoneyService } from "./send-money.service";
import { ModalService } from "../../../../core/services/modal.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { CredixToastService } from "../../../../core/services/credix-toast.service";

@Component({
  selector: "app-send-money",
  templateUrl: "./send-money.component.html",
  styleUrls: ["./send-money.component.scss"],
  providers: [DatePipe],
})
export class SendMoneyComponent implements OnInit, AfterViewInit {
  informationForm: FormGroup = new FormGroup({
    account: new FormControl(null, [Validators.required]),
  });
  amountAndQuotaForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    quotas: new FormControl(3, [Validators.required]),
    detail: new FormControl(null, [Validators.required]),
  });
  confirmForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });
  selectedIndex = 0;
  disableButton = true;
  currencyPrefix: string;
  buttonText = "Continuar";
  commissionRate: number;
  listQuotas: [];
  quotaDetail = {
    commissionRate: 2,
    quota: 0,
    description: "",
    id: 1,
  };
  commission: number;
  total: number;
  getIbanAccountUri = "account/getibanaccount";
  ibanOrigin;
  sendMoneyUri = "channels/senddirect";
  done = false;
  todayString: string;
  typeDestination;

  @ViewChild("sendMoneyStepper") stepper: CdkStepper;

  constructor(
    private sendMoneyService: SendMoneyService,
    private modalService: ModalService,
    private router: Router,
    private datePipe: DatePipe,
    public toastService: CredixToastService
  ) {
    this.todayString = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ngOnInit(): void {
    this.getIbanAcount();
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  setEnableButton() {
    switch (this.selectedIndex) {
      case 0:
        this.disableButton = this.informationForm.invalid;
        this.informationForm.valueChanges.subscribe((value) => {
          this.disableButton = this.informationForm.invalid;
        });
        break;
      case 1:
        this.disableButton = this.amountAndQuotaForm.invalid;
        this.amountAndQuotaForm.valueChanges.subscribe((value) => {
          this.disableButton = this.amountAndQuotaForm.invalid;
        });
        break;
      case 2:
        this.disableButton = this.confirmForm.invalid;
        this.confirmForm.valueChanges.subscribe((value) => {
          this.disableButton = this.confirmForm.invalid;
        });
        break;
    }
  }

  next() {
    this.selectedIndex < 3 && this.selectedIndex++;
    if (this.selectedIndex === 2) {
      this.buttonText = "Transferir";
    }
    if (this.selectedIndex === 3) {
      this.openConfirmationModal();
    }

    this.stepper.next();
    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

  getIbanAcount() {
    this.sendMoneyService.getIbanAccount().subscribe((res) => {
      if (res.type === "success") {
        this.ibanOrigin = res.ibanAccountList[0].ibanAccountNumber;
        console.log(this.ibanOrigin);
      }
    });
  }

  sendMoney() {
    const ibanOrigin = this.ibanOrigin;
    const crcId = this.currencyPrefix === "$" ? 840 : 188;
    const creationDate = this.todayString;
    const amountTransfer = this.amountAndQuotaForm.controls.amount.value;
    const ibanDestinity = this.informationForm.controls.account.value
      .ibanAccount;
    const typeDestinationId = this.typeDestination;
    const nameDestination = this.informationForm.controls.account.value
      .aliasName;
    const period = this.amountAndQuotaForm.controls.quotas.value;
    const commissionAmount = this.commission;
    const totalAmount = this.total;
    const identification = this.informationForm.controls.account.value
      .identification;
    const credixCode = this.confirmForm.controls.code.value;
    console.log(
      ibanOrigin,
      crcId,
      creationDate,
      amountTransfer,
      ibanDestinity,
      typeDestinationId,
      nameDestination,
      period,
      commissionAmount,
      totalAmount,
      identification,
      credixCode
    );
    this.sendMoneyService
      .sendMoney(
        ibanOrigin,
        crcId,
        creationDate,
        amountTransfer,
        ibanDestinity,
        typeDestinationId,
        nameDestination,
        period,
        commissionAmount,
        totalAmount,
        identification,
        credixCode
      )
      .subscribe((res) => {
        console.log(res);
        const text = res.message;
        const type = res.type;
        this.toastService.show({ text, type });
        if (res.type === "success") {
          this.done = true;
        }
      });
  }

  openConfirmationModal() {
    this.modalService
      .confirmationPopup("¿Desea realizar esta transferencia?")
      .subscribe((res) => {
        if (res) {
          this.sendMoney();
        }
      });
  }

  goHome() {
    this.router.navigate(["/home"]).then();
  }
}
