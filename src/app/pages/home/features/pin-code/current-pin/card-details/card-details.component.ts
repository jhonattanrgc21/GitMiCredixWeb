import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/shared/models/card';
import { ChangePinService } from '../../pin-code.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  @Input() icon: String;
  @Input('card') card: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changePinService: ChangePinService,
  ) { }

  ngOnInit(): void {

  }

  changePin(cardPin) {
    this.changePinService.cardPin = cardPin;
    this.router.navigate(['current-pin'], {relativeTo: this.route});
  }

}
