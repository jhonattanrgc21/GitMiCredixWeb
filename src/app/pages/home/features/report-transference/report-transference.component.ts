import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../../../shared/models/currency';
import {ReportTransferenceService} from './report-transference.service';
import {GlobalRequestsService} from '../../../../core/services/global-requests.service';
import {ModalService} from '../../../../core/services/modal.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DeviceInfo} from 'ngx-device-detector/device-detector.service';
import {CredixToastService} from '../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-report-transference',
  templateUrl: './report-transference.component.html',
  styleUrls: ['./report-transference.component.scss']
})
export class ReportTransferenceComponent implements OnInit {
  reportTransferenceGroup: FormGroup = new FormGroup({
    bank: new FormControl(null, [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required])
  });
  image: { file: string; name: string; size: number, type: string };
  deviceInfo: DeviceInfo;
  currencies: Currency[] = [];
  open = false;
  banks = ['BAC', 'Banco Nacional', 'Otros'];

  constructor(private reportTransferenceService: ReportTransferenceService,
              private globalRequestsService: GlobalRequestsService,
              private modalService: ModalService,
              private toastService: CredixToastService,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.globalRequestsService.getCurrencies().subscribe(currencies => this.currencies = currencies);
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  openCalendar() {
    this.modalService.calendarPopup().subscribe(modal => {
      if (modal) {
        this.reportTransferenceGroup.controls.date.setValue(modal.date);
      }
    });
  }

  addVoucher(image) {
    if (image.size > 3000000) {
      this.toastService.show({text: 'La imagen debe ser menor a 3 MB', type: 'error'});
      this.image = null;
    } else {
      this.image = image;
    }
  }

  send() {
    if (this.reportTransferenceGroup.valid) {
      const paymentDate = this.reportTransferenceGroup.controls.date.value as Date;
      this.reportTransferenceService.reportTransference({
        bank: this.reportTransferenceGroup.controls.bank.value,
        currency: this.reportTransferenceGroup.controls.currency.value,
        amount: +this.reportTransferenceGroup.controls.amount.value,
        paymentDate: `${paymentDate.getFullYear()}-${paymentDate.getMonth() < 10 ? '0' + (paymentDate.getMonth() + 1) : paymentDate.getMonth() + 1}-${paymentDate.getDate() < 10 ? '0' + (paymentDate.getMonth() + 1) : paymentDate.getDate() + 1}`,
        imagebase64: this.image ? this.image.file : null,
        imageType: this.image ? this.image.type.substring(6, this.image.type.length) : null
      }).subscribe(response => {
        this.toastService.show({text: response.message, type: response.type});
      });
    }
  }
}
