import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";
import { TableElement } from "../../../../shared/models/table.model";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { ConvertStringDateToDate } from "../../../../shared/utils";
import { SlicePipe } from "@angular/common";

@Component({
  selector: "app-cancellation",
  templateUrl: "./cancellation.component.html",
  styleUrls: ["./cancellation.component.scss"],
})
export class CancellationComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    "select",
    "date",
    "commerce",
    "amount",
    "quotas",
    "rate",
  ];
  dataSource: TableElement[];
  currencyCode = "₡";
  balance: number = 0;
  check = true;
  p = 0;
  disableButton = false;
  showResponse = false;
  options = { autoHide: false, scrollbarMinSize: 50 };
  showSuccess;
  errorTitle;
  errorDescrip;
  quotasToCancel$ = [];
  quotasToCancel = [];
  balanceC: number = 0;
  balanceD: number = 0;
  cancelledTotal: number = 0;
  paymentList = [];
  empty = false;
  tabs = [
    { id: 1, name: "Colones" },
    { id: 2, name: "Dólares" },
  ];
  checked = false;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    //this.checkFuntionallity();
    this.getOptionsToCancel();
    this.balance = this.balanceC;
    this.dataSource = this.quotasToCancel;
  }

  tabSelected(tab) {
    if (tab.id === 1) {
      this.currencyCode = "₡";
      this.balance = this.balanceC;
      this.dataSource = this.quotasToCancel;
      this.selection.clear();
    } else {
      this.currencyCode = "$";
      this.balance = this.balanceD;
      this.dataSource = this.quotasToCancel$;
      this.selection.clear();
    }
  }

  checkFuntionallity() {
    this.httpService
      .post("canales", "channels/cutdate", {
        channelId: 102,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.titleOne !== "Éxito") {
          this.showResponse = true;
          this.errorTitle = res.titleOne;
          this.errorDescrip = res.descriptionOne;
          this.showSuccess = false;
        } else {
          this.showResponse = false;
          //this.getOptionsToCancel();
        }
      });
  }

  getOptionsToCancel() {
    /*this.httpService
      .post("canales", "account/pendingquotes", {
        channelId: 102,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.type === "success") {
          this.balanceC = this.changeFormat(res.SaldoDisponibleColones);
          this.balanceD = this.changeFormat(res.SaldoDisponibleDolares);
          res.CuotasDolares.forEach((elem, i) => {
            this.quotasToCancel$ = [
              ...this.quotasToCancel$,
              {
                id: i,
                date: elem.fechaOrigen,
                commerce: elem.pdv,
                amount: elem.saldoPendiente,
                quotas: elem.cuotasPendientes,
                rate: elem.tasa,
                currencyId: elem.currencyId,
                pdvId: elem.pdvId,
              },
            ];
          });

          res.CuotasColones.forEach((elem, i) => {
            this.quotasToCancel = [
              ...this.quotasToCancel,
              {
                id: i,
                date: elem.fechaOrigen,
                commerce: elem.pdv,
                amount: elem.saldoPendiente,
                quotas: elem.cuotasPendientes,
                rate: elem.tasa,
                currencyId: elem.currencyId,
                pdvId: elem.pdvId,
              },
            ];
          });
        } else {
          this.empty = true;
        }
      });*/
    this.balanceC = this.changeFormat("695.522,81");
    this.balanceD = this.changeFormat("0,00");
    this.quotasToCancel$ = [
      ...this.quotasToCancel$,
      {
        id: 1,
        quotas: 2,
        currencyId: 188,
        date: "2020-01-25",
        commerce: "CUOTIFICACION",
        amount: "695.522,81",
        rate: 0,
        pdvId: 17825,
      },
      {
        id: 2,
        quotas: 2,
        currencyId: 188,
        date: "2020-01-25",
        commerce: "CUOTIFICACION",
        amount: "12.221,881",
        rate: 0,
        pdvId: 17825,
      },
      {
        id: 3,
        quotas: 2,
        currencyId: 188,
        date: "2020-01-25",
        commerce: "CUOTIFICACION",
        amount: "700.522,81",
        rate: 0,
        pdvId: 17825,

      },
    ]
    this.quotasToCancel = [
        ...this.quotasToCancel,
        {
          id: 1,
          quotas: 2,
          currencyId: 188,
          date: "2020-01-25",
          commerce: "CUOTIFICACION",
          amount: "695.522,81",
          rate: 0,
          pdvId: 17825,
        },
        {
          id: 2,
          quotas: 2,
          currencyId: 188,
          date: "2020-01-25",
          commerce: "CUOTIFICACION",
          amount: "12.221,881",
          rate: 0,
          pdvId: 17825,
        },
        {
          id: 3,
          quotas: 2,
          currencyId: 188,
          date: "2020-01-25",
          commerce: "CUOTIFICACION",
          amount: "700.522,81",
          rate: 0,
          pdvId: 17825,

        },
      ];
  }

  cancel() {
    this.selection.selected.forEach((el) => {
      this.paymentList = [
        ...this.paymentList,
        {
          pdvId: el.pdvId,
          fechaOrigen: el.date,
          saldoPendiente: el.amount,
          tasa: el.rate,
          cuotasPendientes: el.quotas,
          currencyId: el.currencyId,
        },
      ];
      this.cancelledTotal += this.changeFormat(el.amount);
    });

    this.httpService
      .post("canales", "account/saveadvancepayments", {
        channelId: 102,
        saldoInicial: this.currencyCode === "₡" ? this.balanceC : this.balanceD,
        saldoFinal: this.balance,
        advancePaymentList: this.paymentList,
      })
      .subscribe((resp) => {
        console.log(resp);
        this.showResponse = true;
        if (resp.type === "success") {
          this.showSuccess = true;
        } else {
          this.showSuccess = false;
          this.errorTitle = resp.titleOne;
          this.errorDescrip = resp.descriptionOne;
        }
      });
  }

  change(event, row) {
    this.selection.toggle(row);
    this.checked = event.checked;
    let amount = this.changeFormat(row.amount);
    if (event.checked) {
      this.balance = this.balance - amount;
    } else {
      this.balance = this.balance + amount;
    }
  }

  done() {
    this.router.navigate(["/home"]).then();
  }

  convertStringDateToDate(value: string): Date {
    let date =
      value.slice(8, 10) + "/" + value.slice(5, 7) + "/" + value.slice(0, 4);
    return ConvertStringDateToDate(date);
  }

  changeFormat(value) {
    let removeDot = value.replace(".", "");
    let finalString = removeDot.replace(",", ".");
    return Number(finalString);
  }
}
