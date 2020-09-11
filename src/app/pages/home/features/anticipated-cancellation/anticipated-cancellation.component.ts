import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../../core/services/http.service";
import { TableElement } from "../../../../shared/models/table.model";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { ConvertStringDateToDate } from "../../../../shared/utils";
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

@Component({
  selector: "app-anticipated-cancellation",
  templateUrl: "./anticipated-cancellation.component.html",
  styleUrls: ["./anticipated-cancellation.component.scss"],
})
export class AnticipatedCancellationComponent implements OnInit {
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
  balance = 0;
  check = true;
  p = 0;
  showResponse = false;
  options = { autoHide: false, scrollbarMinSize: 50 };
  showSuccess;
  errorTitle;
  errorDescrip;
  quotasToCancel$ = [];
  quotasToCancel = [];
  balanceC = 0;
  balanceD = 0;
  cancelledTotal = 0;
  paymentList = [];
  empty = false;
  tabs = [
    { id: 1, name: "Colones" },
    { id: 2, name: "Dólares" },
  ];
  tab = { id: 1, name: "Colones" };
  checked = false;
  amountTag;
  titleTag;
  balanceTag;
  warningTag;
  cosumTag;
  pendingbalanceTag;

  constructor(private tagsService: TagsService, private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    //this.checkFuntionallity();
    this.getOptionsToCancel();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Cancelación anticipada').tags)
    );
  }

  getTags(tags: Tag[]) {
    this.amountTag = tags.find(tag => tag.description === 'cancelacion.tag.monto').value;
    this.titleTag = tags.find(tag => tag.description === 'cancelacion.title').value;
    this.balanceTag = tags.find(tag => tag.description === 'cancelacion.tag.saldo').value;
    this.tabs = [
      { id: 1, name: tags.find(tag => tag.description === 'cancelacion.tab1').value || "Colones" },
      { id: 2, name: tags.find(tag => tag.description === 'cancelacion.tab2').value || "Dólares" },
    ];
    this.warningTag = tags.find(tag => tag.description === 'cancelacion.message.warning').value;
    this.cosumTag = tags.find(tag => tag.description === 'cancelacion.tag.consumos').value;
    this.pendingbalanceTag = tags.find(tag => tag.description === 'cancelacion.tag.saldopendiente').value;

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
        if (res.titleOne !== "Éxito") {
          this.showResponse = true;
          this.errorTitle = res.titleOne;
          this.errorDescrip = res.descriptionOne;
          this.showSuccess = false;
        } else {
          this.showResponse = false;
          // this.getOptionsToCancel();
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

          this.balance = this.balanceC;
          this.dataSource = this.quotasToCancel;

        } else {
          this.empty = true;
        }
      });
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
    const amount = this.changeFormat(row.amount);
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
    const date =
      value.slice(8, 10) + "/" + value.slice(5, 7) + "/" + value.slice(0, 4);
    return ConvertStringDateToDate(date);
  }

  changeFormat(value) {
    const removeDot = value.replace(".", "");
    const finalString = removeDot.replace(",", ".");
    return Number(finalString);
  }
}
