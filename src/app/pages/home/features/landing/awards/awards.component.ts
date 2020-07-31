import {Component, Input, OnInit} from '@angular/core';
import {Awards} from '../landing.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  @Input() awards: Awards[] = [{img: '', title: '', description: ''}];

  constructor() {
  }

  ngOnInit(): void {
  }

}
