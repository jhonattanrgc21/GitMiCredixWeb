import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";
import { ModalService } from "../../../../core/services/modal.service";
import { Router } from "@angular/router";
import { StorageService } from "../../../../core/services/storage.service";
@Component({
  selector: "app-extend-term",
  templateUrl: "./extend-term.component.html",
  styleUrls: ["./extend-term.component.scss"],
})
export class ExtendTermComponent implements OnInit {
  @Input() optionSelected;
  @Input() quotaSelected;
  options = [
    {
      id: 1,
      name: "AEROPOST WEBdsfdgffdffgffgdgfgdfg",
      cardId: 289534,
      totalPlanQuota: 3,
      accountNumber: 17188340,
      movementId: "189896138-4",
      originDate: "17/04/2020",
      originAmount: "85.000",
      originCurrency: "¢",
      quotaAmount: 28300,
      subOptions: [
        {
          feeAmount: "3.000",
          feePercentage: 4,
          quotaTo: 6,
          amountPerQuota: "12.500",
          quotaFrom: 3,
          financedPlan: 0,
          purchaseAmount: "75.000"
        },
        {
          feeAmount: "9.000",
          feePercentage: 12,
          quotaTo: 12,
          amountPerQuota: "6.250",
          quotaFrom: 3,
          financedPlan: 0,
          purchaseAmount: "75.000"
        },
      ],
    },
    {
      id: 2,
      name: "AEROPOST WEB Maria",
      cardId: 289534,
      totalPlanQuota: 3,
      accountNumber: 17188340,
      movementId: "189896138-4",
      originDate: "17/04/2020",
      originAmount: "85.000",
      originCurrency: "¢",
      quotaAmount: 28300,
      subOptions: [
        {
          feeAmount: "3.000",
          feePercentage: 4,
          quotaTo: 6,
          amountPerQuota: "12.500",
          quotaFrom: 3,
          financedPlan: 0,
          purchaseAmount: "75.000"
        },
        {
          feeAmount: "9.000",
          feePercentage: 12,
          quotaTo: 12,
          amountPerQuota: "6.250",
          quotaFrom: 3,
          financedPlan: 0,
          purchaseAmount: "75.000"
        },
        {
          feeAmount: "15.000",
          feePercentage: 20,
          quotaTo: 18,
          amountPerQuota: "4.166,67",
          quotaFrom: 3,
          financedPlan: 0,
          purchaseAmount: "75.000"
        }
      ],
    },
  ];
  allowedMovements;
  quotaList: [];
  message: string = "El plazo de su compra ha sido extendido correctamente.";
  resType: string = "success";
  showResponse = false;
  currencyCode: string = "$";
  empty: boolean = false;

  constructor(
    private storageService: StorageService,
    private httpService: HttpService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllowedMovements();
  }

  getAllowedMovements() {
    this.httpService
      .post("canales", "channels/allowedmovements", {
        accountId: this.storageService.getCurrentUser().aplId,
        cardId: this.storageService.getCurrentCards()[0].cardId,
        channelId: 102,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.result) {
          this.allowedMovements = res.result;
          this.empty = false;
          this.allowedMovements.forEach(async (elem, i) => {
            let quotaAmount = parseInt(elem.originAmount) / parseInt(elem.totalPlanQuota);
            await this.calculateQuota(elem.movementId);
            this.options = [
              ...this.options,
              {
                id: i + 1,
                name: elem.establishmentName,
                cardId: elem.cardId,
                totalPlanQuota: elem.totalPlanQuota,
                accountNumber: elem.accountNumber,
                movementId: elem.movementId,
                originDate: elem.originDate,
                originAmount: elem.originAmount,
                originCurrency: elem.originCurrency.currency,
                quotaAmount: quotaAmount,
                subOptions: this.quotaList,
              },
            ];
          });
        }else{
          //this.empty = true;
        }
      });
  }

  calculateQuota(movementId) {
    this.httpService
      .post("canales", "channels/quotacalculator", {
        channelId: 102,
        movementId: movementId,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.type === "success") {
          this.quotaList = res.listQuota;
        }
      });
  }

  saveQuota() {
    this.httpService
      .post("canales", "channels/savequotification", {
        channelId: 102,
        cardId: this.optionSelected.cardId,
        feeAmount: this.quotaSelected.feeAmount,
        newQuota: this.quotaSelected.quotaTo,
        statusId: 1,
        movementId: this.optionSelected.movementId,
        userIdCreate: this.storageService.getCurrentUser().userId,
      })
      .subscribe((res) => {
        console.log(res);
        this.resType = res.type;
        this.message = res.message;
      });
  }

  openConfirmationModal() {
    if(this.quotaSelected){
      this.modalService
      .confirmationPopup("¿Desea ampliar el plazo de este pago?")
      .subscribe((res) => {
        if (res) {
          this.showResponse = true;
          this.saveQuota();
        }
      });
    }else{

    }

  }

  done() {
    this.router.navigate(["/home"]);
  }
}
