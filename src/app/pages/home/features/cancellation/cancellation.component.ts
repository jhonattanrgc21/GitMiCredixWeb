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
  prueba = [
    {
      id: 1,
      date: "29 Oct 19",
      commerce: "Nombre del comercio",
      amount: "100.00",
      quotas: "cuota 1 de 12",
      rate: "#.#%",
    },
    {
      id: 2,
      date: "30 Oct 19",
      commerce: "2Nombre corto",
      amount: "2100.00",
      quotas: "2cuota 1 de 12",
      rate: "3#.#%",
    },
    {
      id: 3,
      date: "31 Oct 19",
      commerce: "3Nombre largo del comercio",
      amount: "3100.00",
      quotas: "3cuota 1 de 12",
      rate: "2#.#%",
    },
  ];
  prueba2 = [
    {
      id: 1,
      date: "29 Oct 19x",
      commerce: "Nombre del comerciox",
      amount: "100.00",
      quotas: "cuota 1 de 12",
      rate: "#.#%",
    },
    {
      id: 2,
      date: "29 Oct 19x",
      commerce: "Nombre cortxo",
      amount: "100.00x",
      quotas: "cuota 1 de 12",
      rate: "#.#%",
    },
    {
      id: 3,
      date: "29 Oct 19x",
      commerce: "Nombre largo del comerciox",
      amount: "100.00",
      quotas: "cuota 1 de 12",
      rate: "#.#%",
    },
  ];
  currencyCode = "₡";
  balance = 1000;
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
    this.getOptionsToCancel();
    console.log(this.selection);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row) => this.selection.select(row));
  }

  tabSelected(tab) {
    if (tab.id === 1) {
      this.currencyCode = "₡";
      this.balance = 1000;
      this.dataSource = this.prueba;
      this.selection.clear();
      //this.dataSource = this.quotasToCancel;
    } else {
      this.currencyCode = "$";
      this.balance = this.balanceD;
      this.dataSource = this.prueba2;
      this.selection.clear();
      //this.dataSource = this.quotasToCancel$;
    }
  }

  checkFuntionallity() {
    this.httpService
      .post("canales", "channels/cutdate", {
        channelId: 102,
      })
      .subscribe((res) => {
        this.showResponse = true;
        if (res.titleOne !== "Éxito") {
          this.errorTitle = res.titleOne;
          this.errorDescrip = res.descriptionOne;
        }
        res.titleOne === "Éxito"
          ? (this.showSuccess = true)
          : (this.showSuccess = false);
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
              },
            ];
          });
        } else {
          //this.empty = true;
        }
      });
  }

  cancel() {
    this.httpService.post("canales", "account/saveadvancepayments", {
      channelId: 101,
      saldoInicial: "70.000,00",
      saldoFinal: "70.000,00",
      advancePaymentList: [
        {
          pdvId: "33378",
          fechaOrigen: "2019-05-29",
          saldoPendiente: "70.000,00",
          tasa: "2",
          cuotasPendientes: 3,
          currencyId: 188,
        },
        {
          pdvId: "33580",
          fechaOrigen: "2019-12-23",
          saldoPendiente: "21.866,67",
          tasa: "0",
          cuotasPendientes: 1,
          currencyId: 188,
        },
      ],
    });
  }

  change(event, row) {
    console.log(parseInt(row.amount), this.balance)
    this.selection.toggle(row);
    if (event.checked) {
      console.log('-',this.balance - parseInt(row.amount))
      this.balance = this.balance - parseInt(row.amount);
    } else {
      console.log('+',this.balance + parseInt(row.amount))
      this.balance = this.balance + parseInt(row.amount);
    }
  }

  done() {
    console.log(this.selection);
    this.router.navigate(["/home"]).then();
  }
}
