import {Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-automatics',
  templateUrl: './automatics.component.html',
  styleUrls: ['./automatics.component.scss']
})
export class AutomaticsComponent implements OnInit {


  showContent = false;
  // tslint:disable-next-line:max-line-length
  data: { publicServiceDescription: string; alias: string; id: number; maxAmount: number; periodicityDescription: string; startDate: string; key: number; };
  automaticsDetailForm: FormGroup = new FormGroup({
    favoriteName: new FormControl({value: null, disabled: true}),
    maxAmount: new FormControl({value: null, disabled: true}),
    startDate: new FormControl({value: null, disabled: true}),
    periodicityDescription: new FormControl({value: null, disabled: true})
  });

  constructor(private favoritesManagementService: FavoritesManagementService) {
  }

  ngOnInit(): void {
    this.getSchedulePayment();
  }

  getSchedulePayment() {
    this.favoritesManagementService.automaticsPaymentData.subscribe(response => {
      this.showContent = !this.showContent;
      this.data = {
        publicServiceDescription: response.publicServiceDescription,
        alias: response.alias,
        id: response.id,
        maxAmount: response.maxAmount,
        periodicityDescription: response.periodicityDescription,
        startDate: response.startDate,
        key: response.key
      };
    });
  }

}
