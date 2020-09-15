import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-digital-payments',
  templateUrl: './digital-payments.component.html',
  styleUrls: ['./digital-payments.component.scss']
})
export class DigitalPaymentsComponent implements OnInit {
  copyId = 0;
  phoneNumberTag: string;
  firstSubtitleTag: string;
  secondSubtitleTag: string;
  thirdSubtitleTag: string;
  firstTextTag: string;
  secondTexTag: string;
  thirdTextTag: string;
  fourthTextTag: string;
  fifthTextTag: string;
  sixthTextTag: string;
  credixTag: string;
  dollarTag: string;
  colonesTag: string;
  accountNameTag: string;
  ibanDollarsTag: string;
  ibanColonesTag: string;
  identificationTag: string;
  legalIdentificationTag: string;

  constructor(private toastService: CredixToastService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Lugares de pago').tags)
    );
  }

  copyIbanAccount(text: string, id: 1 | 2 | 3 | 4) {
    this.copyId = id;
    this.toastService.show({text, type: 'success'});
    setTimeout(() => this.copyId = 0, 3000);
  }

  goToReportTransference() {
    this.router.navigate(['/home/report-transference']);
  }

  getTags(tags: Tag[]) {
    this.phoneNumberTag = tags.find(tag => tag.description === 'lugares.tab2.link').value;
    this.firstSubtitleTag = tags.find(tag => tag.description === 'lugares.tab2.subtitle1').value;
    this.secondSubtitleTag = tags.find(tag => tag.description === 'lugares.tab2.subtitle2').value;
    this.thirdSubtitleTag = tags.find(tag => tag.description === 'lugares.tab2.subtitle3').value;
    this.credixTag = tags.find(tag => tag.description === 'lugares.tab2.tag.credix').value;
    this.dollarTag = tags.find(tag => tag.description === 'lugares.tab2.tag.dolares').value;
    this.colonesTag = tags.find(tag => tag.description === 'lugares.tab2.tag.colones').value;
    this.accountNameTag = tags.find(tag => tag.description === 'lugares.tab2.tag.nombre').value;
    this.ibanDollarsTag = tags.find(tag => tag.description === 'lugares.tab2.tag.ibandolares').value;
    this.ibanColonesTag = tags.find(tag => tag.description === 'lugares.tab2.tag.ibancolones').value;
    this.identificationTag = tags.find(tag => tag.description === 'lugares.tab2.tag.cedula2').value;
    this.legalIdentificationTag = tags.find(tag => tag.description === 'lugares.tab2.tag.cedula').value;
    this.firstTextTag = tags.find(tag => tag.description === 'lugares.tab2.tag.sinpem').value;
    this.secondTexTag = tags.find(tag => tag.description === 'lugares.tab2.tag.trans1').value;
    this.thirdTextTag = tags.find(tag => tag.description === 'lugares.tab2.tag.trans2').value;
    this.fourthTextTag = tags.find(tag => tag.description === 'lugares.tab2.tag10').value;
    this.fifthTextTag = tags.find(tag => tag.description === 'lugares.tab2.tag11').value;
    this.sixthTextTag = tags.find(tag => tag.description === 'lugares.tab2.tag12').value;
  }
}
