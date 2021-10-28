import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtendTermTotalOwedApiService } from 'src/app/core/services/extend-term-total-owed-apoi.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-extend-term-total-notification',
  templateUrl: './extend-term-total-notification.component.html',
  styleUrls: ['./extend-term-total-notification.component.scss']
})
export class ExtendTermTotalNotificationComponent implements OnInit {

  message: string;
  title: string;
  status: string;
  today = new Date();
  currency: string;
  amount: string;
  quota: number;
  titleTag: string;
  commerceTag: string;
  newQuotaTag: string;
  dateTag: string;

  constructor(
    private extendTermTotalOwedService: ExtendTermTotalOwedApiService,
    private tagsService: TagsService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if ( !this.extendTermTotalOwedService.result ) {
      this.router.navigate(['/home/extend-term-total-owed']);
    }
    
    this.currency = this.extendTermTotalOwedService.newQuota?.currency;
    this.amount = this.extendTermTotalOwedService.newQuota?.amount;
    this.quota = this.extendTermTotalOwedService.newQuota?.quota;
    this.status = this.extendTermTotalOwedService.result.status;
    this.message = this.extendTermTotalOwedService.result.message;
  
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Ampliar plazo de compra').tags));
  }

  getTags(tags:Tag[]) {
    this.commerceTag = tags.find(tag => tag.description === 'ampliar.result.comercio')?.value;
    this.dateTag = tags.find(tag => tag.description === 'ampliar.result.fecha')?.value;
    this.newQuotaTag = tags.find(tag => tag.description === 'ampliar.tag.nuevacuota')?.value;
    this.titleTag = tags.find(tag => tag.description === 'ampliar.title')?.value;
  }

  ngOnDestroy(): void {
  }

}
