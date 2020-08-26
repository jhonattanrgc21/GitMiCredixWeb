import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarchamosService } from '../marchamos.service';

@Component({
  selector: 'app-four-step-marchamo',
  templateUrl: './four-step-marchamo.component.html',
  styleUrls: ['./four-step-marchamo.component.scss']
})
export class FourStepMarchamoComponent implements OnInit, OnChanges {


  @Input()  confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });

  @Input() isActive: boolean = false;

  constructor(private marchamosService: MarchamosService) { }

  ngOnInit(): void {
    this.marchamosService.ivaAndCommission.subscribe(value => {
      console.log(value);
    });
    this.marchamosService.domicileDescription.subscribe(value => {
      console.log(value);
    });
    this.marchamosService.newDeliveryDirection.subscribe(value => {
      console.log(value);
    });
    this.marchamosService.pickUpStoreId.subscribe(value=> {
      console.log(value);
    });
    this.marchamosService.consultVehicleAndBillingHistory.subscribe(value =>{
      
    });
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes.isActive && this.isActive) {
     
    }
  }

}
