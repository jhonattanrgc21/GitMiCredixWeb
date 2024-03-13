import { Component, OnInit } from '@angular/core';
import { CredixMasService } from '../credix-mas.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-credix-mas-info',
  templateUrl: './credix-mas-info.component.html',
  styleUrls: ['./credix-mas-info.component.scss']
})
export class CredixMasInfoComponent implements OnInit {

  subscription = false;
  benefits: { icon: string, description: string }[] = [];
  notification: { title: string, message: string, type: string};

  constructor(private credixMasService: CredixMasService) { }

  ngOnInit(): void {
    this.benefits = this.credixMasService.getBenefits().map(el => {
      let description = el.value.split('/')[0];
      let icon = el.value.split('/')[1].replace(/\s/g,'');
      return { icon , description }
    });
    this.subscription = this.credixMasService.subscription;
    this.notification = this.credixMasService.notification;
  }

}
