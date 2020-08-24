import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";
import {ModalService} from '../../../../core/services/modal.service';

@Component({
  selector: "app-extend-term",
  templateUrl: "./extend-term.component.html",
  styleUrls: ["./extend-term.component.scss"],
})
export class ExtendTermComponent implements OnInit {
  options = [];
  allowedMovements: [];
  quotaList: [];
  message: string;
  resType: string;

  constructor(private httpService: HttpService,
  private modalService: ModalService) {}

  ngOnInit(): void {}

  getAllowedMovements() {
    this.httpService
      .post("canales", "channels/allowedmovements", {
        accountId: 64751,
        cardId: 289534,
        channelId: 102,
      })
      .subscribe((res) => {
        console.log(res);
        this.allowedMovements = res.resul;
      });
  }

  calculateQuota() {
    this.httpService
      .post("canales", "channels/quotacalculator", {
        channelId: 102,
        movementId: "189896137-4",
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
        cardId: 289534,
        feeAmount: 3000,
        newQuota: 6,
        statusId: 1,
        movementId: "189896138-4",
        userIdCreate: 55012,
      })
      .subscribe((res) => {
        console.log(res);
        this.resType = res.type;
        this.message = res.message;
      });
  }

  openConfirmationModal() {
    this.modalService
      .confirmationPopup('¿Desea ampliar el plazo de este pago?')
      .subscribe((res) => {
        if (res) {

        }
      });
  }


}
