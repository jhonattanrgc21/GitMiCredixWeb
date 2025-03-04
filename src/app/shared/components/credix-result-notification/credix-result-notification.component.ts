import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-result-notification',
  templateUrl: './credix-result-notification.component.html',
  styleUrls: ['./credix-result-notification.component.scss']
})
export class CredixResultNotificationComponent implements OnInit {
  @Input() status: 'success' | 'warn' | 'error' | 'info' = 'success';
  @Input() title;
  @Input() message = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
