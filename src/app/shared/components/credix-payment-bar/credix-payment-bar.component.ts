import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-payment-bar',
  templateUrl: './credix-payment-bar.component.html',
  styleUrls: ['./credix-payment-bar.component.scss']
})
export class CredixPaymentBarComponent implements OnInit, OnChanges {
  @Input() firstLabel = 'Corte';
  @Input() secondLabel = 'Fecha máxima de pago';
  @Input() meterLabel = 'Hoy';
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() today: Date;
  @Input() toggleGradient = false;
  displacement = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.displacement = ((this.today.getTime() - this.startDate.getTime()) /
        (this.endDate.getTime() - this.startDate.getTime())) * 100;
    }, 300);
  }
}
