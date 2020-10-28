import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../shared/models/tag';
import {TagsService} from '../../../../../core/services/tags.service';
import {ExtendTermService} from '../extend-term.service';

@Component({
  selector: 'app-extend-term-success-screen',
  templateUrl: './extend-term-success-screen.component.html',
  styleUrls: ['./extend-term-success-screen.component.scss']
})
export class ExtendTermSuccessScreenComponent implements OnInit {
  status: 'success' | 'error';
  message: string;
  establishment: string;
  currency: string;
  amount: string;
  quota: number;
  titleTag: string;
  commerceTag: string;
  newQuotaTag: string;
  dateTag: string;
  today = new Date();

  constructor(private extendTermService: ExtendTermService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.establishment = this.extendTermService.newQuota.establishment;
    this.currency = this.extendTermService.newQuota.currency;
    this.amount = this.extendTermService.newQuota.amount;
    this.quota = this.extendTermService.newQuota.quota;
    this.status = this.extendTermService.result.status;
    this.message = this.extendTermService.result.message;
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
  }

  getTags(tags: Tag[]) {
    this.commerceTag = tags.find(tag => tag.description === 'ampliar.result.comercio')?.value;
    this.dateTag = tags.find(tag => tag.description === 'ampliar.result.fecha')?.value;
    this.newQuotaTag = tags.find(tag => tag.description === 'ampliar.tag.nuevacuota')?.value;
    this.titleTag = tags.find(tag => tag.description === 'ampliar.title')?.value;
  }
}
