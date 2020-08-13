import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import { TableElement } from '../../../../shared/models/table.model';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss']
})
export class CancellationComponent implements OnInit {
  displayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas', 'rate'];
  dataSource: TableElement[];
  currencyCode = '₡';
  balance = 0;
  p = 0;
  disableButton=false;
  showResponse = false;
  options = {autoHide: false, scrollbarMinSize: 50};
  showSuccess;
  errorTitle;
  errorDescrip;
  quotasToCancel$ = [];
  quotasToCancel = [];
  balanceC;
  balanceD;

  tabs = [
    {id: 1, name: 'Colones'},
    {id: 2, name: 'Dólares'},
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getOptionsToCancel();
    console.log(this.quotasToCancel);
    console.log(this.dataSource);
  }

  tabSelected(tab) {
    if(tab.id === 1){
      this.currencyCode = '₡';
      this.balance = this.balanceC;
      this.dataSource = this.quotasToCancel;
    }else{
      this.currencyCode = '$';
      this.balance = this.balanceD;
      this.dataSource = this.quotasToCancel$;
    }
  }

  sendInfo(){
    this.showResponse = true;
  }

  checkFuntionallity(){
    this.httpService.post('canales', 'channels/cutdate', {
      channelId: 102
    }).subscribe(res => {
      this.showResponse = true;
      if(res.titleOne !== 'Éxito'){
        this.errorTitle = res.titleOne;
        this.errorDescrip = res.descriptionOne;
      }
      res.titleOne === 'Éxito' ? this.showSuccess = true : this.showSuccess = false;
    })
  }

  getOptionsToCancel(){
    this.httpService.post('canales', 'account/pendingquotes', {
      channelId: 102
    }).subscribe(res => {
      console.log(res);
      if(res.type === 'success'){
        this.balanceC = res.SaldoDisponibleColones;
        this.balanceD = res.SaldoDisponibleDolares;
        res.CuotasDolares.forEach((elem, i) => {
          this.quotasToCancel$ = [...this.quotasToCancel$, {id: i, date: elem.fechaOrigen, commerce: elem.pdv, amount: elem.saldoPendiente, quotas: elem.cuotasPendientes, rate:elem.tasa}]
        });

        res.CuotasColones.forEach((elem, i) => {
          this.quotasToCancel = [...this.quotasToCancel, {id: i, date: elem.fechaOrigen, commerce: elem.pdv, amount: elem.saldoPendiente, quotas: elem.cuotasPendientes, rate:elem.tasa}]
        });
      }
    })
  }

}

