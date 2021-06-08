import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/models/card';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  @Input() icon: String;
  @Input('card') card: any;
  
  constructor() { }

  ngOnInit(): void {

  }

}
