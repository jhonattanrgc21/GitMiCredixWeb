import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CdkStepper } from "@angular/cdk/stepper";
import { SendMoneyService } from "./send-money.service";
import { ModalService } from "../../../../core/services/modal.service";
import { HttpService } from "../../../../core/services/http.service";
import {Router} from '@angular/router';
@Component({
  selector: "app-send-money",
  templateUrl: "./send-money.component.html",
  styleUrls: ["./send-money.component.scss"],
})
export class SendMoneyComponent implements OnInit, AfterViewInit {
  informationForm: FormGroup = new FormGroup({
    account: new FormControl(null, [Validators.required]),
  });
  amountAndQuotaForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    quotas: new FormControl(1, [Validators.required]),
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

  @ViewChild("sendMoneyStepper") stepper: CdkStepper;

  constructor(
    private sendMoneyService: SendMoneyService,
    private modalService: ModalService,
    private httpService: HttpService,
    private router: Router
  ) {}

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
    this.selectedIndex++;
    if (this.selectedIndex === 2) {
      this.buttonText = "Transferir";
    }
    if (this.selectedIndex === 3) {
      const response = this.modalService.confirmationPopup(
        "¿Desea realizar esta transferencia?",
        ""
      );
      response.subscribe((res) => {
        if (res) {
          this.sendMoney();
        }
      });
    }

    this.stepper.next();
    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

  getIbanAcount(){
    this.httpService.post("canales", this.getIbanAccountUri, {channelId : 102}).subscribe(res=>{
      this.ibanOrigin = res.ibanAccountList[0].ibanAccountNumber;
      console.log(this.ibanOrigin);
    })
  }

  sendMoney() {
    console.log('listo');
    this.done = true;
    /*this.httpService
      .post("canales",  this.sendMoneyUri, {
        channelId : 102,
        ibanOrigin : "CR30042207010035388205",
        crcId : 188,
        esbId : 10,
        creationDate : "2020-08-11",
        amountTransfer : 16754,
        ibanDestinity: "CR16010200009183253589",
        typeDestinationId : 1,
        nameDestination : "María",
        period : "3",
        detail : "Transacción pendiente.",
        commissionAmount : 2000,
        totalAmount : 30000,
        identification: "1-1-7020460",
        trsId : 1,
        credixCode: this.confirmForm.controls.code.value
  }).subscribe(resp=>{
        console.log(resp);
    })*/
  }

  goHome(){
    this.router.navigate(['/home']).then();
  }
}

