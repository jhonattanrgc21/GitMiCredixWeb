import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bars',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  colones = 250000.55;
  dollars = 950;
  maxColones = 1000000;
  minColones = 0;
  maxDollars = 1000;
  minDollars = 0;
  startDateOne = new Date(2020, 7, 2);
  endDateOne = new Date(2020, 7, 19);
  startDateTwo = new Date(2020, 7, 19);
  endDateTwo = new Date(2020, 8, 2);
  currentDate = new Date(2020, 7, 30);

  constructor() {
  }

  ngOnInit(): void {
  }

}
