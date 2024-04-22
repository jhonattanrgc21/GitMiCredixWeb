import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/core/services/modal.service";
import { SubscribePopupComponent } from "./subscribe-popup/subscribe-popup.component";
import { SlowBuffer } from "buffer";
import { Router } from "@angular/router";
import { CredixMasService } from "../credix-mas.service";
import { AccountInfo } from "src/app/shared/models/credix-mas-info";

@Component({
  selector: "app-credix-mas-account-info",
  templateUrl: "./credix-mas-account-info.component.html",
  styleUrls: ["./credix-mas-account-info.component.scss"],
})
export class CredixMasAccountInfoComponent implements OnInit {
  subscription = false;
  info: AccountInfo = {} as AccountInfo;
  today = new Date();
  chargeDay: number;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private credixMasService: CredixMasService
  ) {}

  ngOnInit(): void {
    this.subscription = this.credixMasService.subscription;
    this.info = this.credixMasService._info;
    this.chargeDay = this.getChargeDay();
  }

  getChargeDay() {
    if (this.subscription) {
      return Number(this.info.activationDate.split("/")[0]);
    } else {
      let someDate = new Date();
      let result = someDate.setDate(someDate.getDate() + 2);
      return new Date(result).getDate();
    }
  }

  subscribe() {
    let date = new Date();
    date.setDate(date.getDate() + 2);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    this.modalService
      .open(
        {
          data: {
            subscription: this.subscription,
            date: currentDate,
          },
          hideCloseButton: true,
          component: SubscribePopupComponent,
        },
        {
          width: 400,
          height: 229,
          disableClose: false,
          panelClass: "promo-popup",
        },
        1
      )
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.credixMasService.subscribe().subscribe(() => {
            this.router.navigate(["/home/credix-mas/success"]);
          });
        }
      });
  }
}
