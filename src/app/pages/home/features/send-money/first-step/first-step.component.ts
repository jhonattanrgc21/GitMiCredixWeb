import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  @Input() favoriteAccountControl: FormControl;
  showSecondContent = false;
  showFavoriteAccountsSelect = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  currencyRadioButtonChange(event: { value: number, checked: boolean }) {
    this.showSecondContent = true;
  }

  accountRadioButtonChange(event: { value: string, checked: boolean }) {
    this.showFavoriteAccountsSelect = event.value === '1';
  }

}
