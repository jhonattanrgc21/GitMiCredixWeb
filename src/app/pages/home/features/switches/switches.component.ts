import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.scss']
})
export class SwitchesComponent implements OnInit {
  colon = {id: 1, name: '₡'};
  dollar = {id: 2, name: '$'};

  constructor() {
  }

  ngOnInit(): void {
  }

  optionSelected(option) {

  }

}
