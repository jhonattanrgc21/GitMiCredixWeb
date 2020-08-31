import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { BuyWithoutCardService } from '../buy-without-card.service';
import { Card } from 'src/app/shared/models/card.model';

@Component({
  selector: 'second-step-make-buy',
  templateUrl: './second-step-make-buy.component.html',
  styleUrls: ['./second-step-make-buy.component.scss']
})
export class SecondStepMakeBuyComponent implements OnInit, OnChanges {

  cards: Card[];
  @Input() card: FormControl = new FormControl();
  @Input() isActive: boolean;

  constructor(private httpService: HttpService, 
              private storageService: StorageService,
              private buyWithOutCardService: BuyWithoutCardService) { }

  ngOnInit(): void {
    this.buyWithOutCardService.identification.subscribe(value => {
      this.getCardListByIdentification(value.identification);
    });
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.isActive && this.isActive) {
        
    }
  }

  getCardListByIdentification(identification:string){
    this.httpService.post('canales', 'account/cardlistbyidentification',
    {
      identification:identification,
	    channelId: 102
    })
    .subscribe(response => {
      console.log(response);
      this.cards = response.cardNumberList;
    });
  }

  

}
