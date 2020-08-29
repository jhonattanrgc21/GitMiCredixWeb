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
  options = [];
  allowedMovements;
  quotaList;
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
        accountId: this.storageService.getCurrentUser().actId,
        cardId: this.storageService.getCurrentCards()[0].cardId,
        channelId: 102,
      })
      .subscribe((res) => {
        if (res.result.length) {
          this.allowedMovements = res.result;
          this.empty = false;
          this.allowedMovements.forEach(async (elem, i) => {
            this.quotaList = await this.calculateQuota(elem.movementId, i);
            let quotaAmount = parseInt(elem.originAmount) / parseInt(elem.totalPlanQuota);
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
              },
            ];
          });
        }else{
          this.empty = true;
        }
      });
  }

  calculateQuota(movementId, i) {
    console.log(this.options)
    this.httpService
      .post("canales", "channels/quotacalculator", {
        channelId: 102,
        movementId: movementId,
      })
      .subscribe((res) => {
        if (res.type === "success") {
          this.options[i] = {...this.options[i], subOptions: res.listQuota}
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
