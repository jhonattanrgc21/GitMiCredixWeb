import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'second-step-make-buy',
  templateUrl: './second-step-make-buy.component.html',
  styleUrls: ['./second-step-make-buy.component.scss']
})
export class SecondStepMakeBuyComponent implements OnInit, OnChanges {

  @Input() barCode: number;
  @Input() card: FormControl = new FormControl();
  @Input() isActive: boolean;

  @Input() cardData: any;
  constructor(private httpService: HttpService, private storageService: StorageService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.isActive && this.isActive) {
      this.getCardListByIdentification();  
    }
  }

  getCardListByIdentification(){
    this.httpService.post('canales', 'account/cardlistbyidentification',
    {
      identification:'' ,
	    channelId: 102
    })
    .subscribe(response => {
      console.log(response);
    });
  }

  

}
