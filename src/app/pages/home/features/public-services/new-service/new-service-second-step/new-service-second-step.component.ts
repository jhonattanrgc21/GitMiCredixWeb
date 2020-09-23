import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-service-second-step',
  templateUrl: './new-service-second-step.component.html',
  styleUrls: ['./new-service-second-step.component.scss']
})
export class NewServiceSecondStepComponent implements OnInit {
  @Input() credixCodeControl = new FormControl(null, [Validators.required]);
  @Input() favoriteControl = new FormControl(null);
  @Input() referenceName: string;
  @Input() reference: string;
  @Input() amount: string;
  @Input() name: string;
  @Input() month: string;
  @Input() expirationDate: Date;
  @Input() receipts: number;
  @Output() saveFavoriteEvent = new EventEmitter<boolean>();
  showInput = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onCheckboxChanged(checked: boolean) {
    this.showInput = checked;
    this.saveFavoriteEvent.emit(checked);
  }

}
