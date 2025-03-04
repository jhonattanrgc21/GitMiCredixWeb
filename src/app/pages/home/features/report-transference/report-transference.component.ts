import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../../../shared/models/currency';
import {ReportTransferenceService} from './report-transference.service';
import {ModalService} from '../../../../core/services/modal.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import {GlobalApiService} from '../../../../core/services/global-api.service';

@Component({
  selector: 'app-report-transference',
  templateUrl: './report-transference.component.html',
  styleUrls: ['./report-transference.component.scss']
})
export class ReportTransferenceComponent implements OnInit, OnDestroy {
  reportTransferenceGroup: FormGroup = new FormGroup({
    bank: new FormControl(null, [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required])
  });
  image: { file: string; name: string; size: number, type: string };
  os: string;
  today = new Date();
  currencies: Currency[] = [];
  open = false;
  banks = ['BAC', 'Banco Nacional'];
  done = false;
  message = '';
  status: 'success' | 'error' = 'success';
  title = '';
  titleTag: string;
  link: string;

  constructor(private reportTransferenceService: ReportTransferenceService,
              private globalApiService: GlobalApiService,
              private modalService: ModalService,
              private toastService: CredixToastService,
              private router: Router,
              private deviceService: DeviceDetectorService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.globalApiService.getCurrencies().subscribe(currencies => this.currencies = currencies);
    this.os = this.deviceService.getDeviceInfo().os;
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Reportar transferencia').tags)
    );
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
        // tslint:disable-next-line:max-line-length
        paymentDate: `${paymentDate.getFullYear()}-${paymentDate.getMonth() < 10 ? '0' + (paymentDate.getMonth() + 1) : paymentDate.getMonth() + 1}-${paymentDate.getDate() < 10 ? '0' + (paymentDate.getDate() + 1) : paymentDate.getDate() + 1}`,
        imagebase64: this.image ? this.image.file.split(',')[1] : null,
        imageType: this.image ? this.image.type : null
      }).subscribe(response => {
        // this.toastService.show({text: response.message, type: response.type});
        this.done = true;
        this.message = response.message;
        this.status = response.type;
        this.title = this.status === 'success' ? '¡Éxito!' : 'Error';
      });
    }
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'reportar.title')?.value;
    this.link = tags.find(tag => tag.description === 'reportar.link')?.value;
  }

  ngOnDestroy(): void {
    this.reportTransferenceService.unsubscribe();
  }
}
