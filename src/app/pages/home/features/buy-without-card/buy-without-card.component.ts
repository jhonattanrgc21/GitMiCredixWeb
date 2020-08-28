import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-buy-without-card',
  templateUrl: './buy-without-card.component.html',
  styleUrls: ['./buy-without-card.component.scss']
})
export class BuyWithoutCardComponent implements OnInit {

  barCode: any = 1234567890; //output in template 12-34-56-78-90
  stepperIndex:number = 0;

  credixCode: FormControl = new FormControl(null,[Validators.required]);
  card: FormControl = new FormControl(null,[Validators.required]);

  @ViewChild('buyWithOutCard') stepper: CdkStepper;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    console.log(this.stepper);
  }

  continue(){
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  back(){

  }

  generatePin(){
    this.httpService.post('canales','touchandpay/generatepin',
    {
      channelId:102,
      cardId: this.storageService.getCurrentCards()[0].cardId,
      userId: this.storageService.getCurrentUser().userId,
      credixCode: this.credixCode.value.toString()
    })
    .subscribe(response => {
      console.log(response);
    });
  }

 

  

}
