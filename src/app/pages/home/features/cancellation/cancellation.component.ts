import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";
import { TableElement } from "../../../../shared/models/table.model";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";

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
  balance = 1000;
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
  balanceC = 0;
  balanceD = 0;
  empty = false;
  tabs = [
    { id: 1, name: "Colones" },
    { id: 2, name: "Dólares" },
  ];

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.checkFuntionallity();
  }

  tabSelected(tab) {
    if (tab.id === 1) {
      this.currencyCode = "₡";
      this.balance = 1000;
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
        if (res.titleOne !== "Éxito") {
          this.showResponse = true;
          this.errorTitle = res.titleOne;
          this.errorDescrip = res.descriptionOne;
          this.showSuccess = false;
        } else {
          this.showResponse = false;
          this.getOptionsToCancel();
        }
      });
  }

  getOptionsToCancel() {
    this.httpService
      .post("canales", "account/pendingquotes", {
        channelId: 102,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.type === "success") {
          this.balanceC = res.SaldoDisponibleColones;
          this.balanceD = res.SaldoDisponibleDolares;
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
      });
  }

  cancel() {
    let paymentList = [];
    this.selection.selected.forEach((el) => {
      paymentList = [
        ...paymentList,
        {
          pdvId: el.pdvId,
          fechaOrigen: el.date,
          saldoPendiente: el.amount,
          tasa: el.rate,
          cuotasPendientes: el.quotas,
          currencyId: el.currencyId,
        },
      ];
    });
    this.httpService
      .post("canales", "account/saveadvancepayments", {
        channelId: 102,
        saldoInicial: this.currencyCode === "₡" ? this.balanceC : this.balanceD,
        saldoFinal: this.balance,
        advancePaymentList: paymentList,
      })
      .subscribe((resp) => {
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
    if (event.checked) {
      this.balance = this.balance - parseInt(row.amount);
    } else {
      this.balance = this.balance + parseInt(row.amount);
    }
  }

  done() {
    console.log(this.selection);
    this.router.navigate(["/home"]).then();
  }
}
