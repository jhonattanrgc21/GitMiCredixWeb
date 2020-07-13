import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-alerts-and-messages',
  templateUrl: './alerts-and-messages.component.html',
  styleUrls: ['./alerts-and-messages.component.scss']
})
export class AlertsAndMessagesComponent implements OnInit {

  constructor(public toastService: CredixToastService) {
  }

  ngOnInit(): void {
  }

  showToast(type, text: string) {
    this.toastService.show({text, type});
  }

}
