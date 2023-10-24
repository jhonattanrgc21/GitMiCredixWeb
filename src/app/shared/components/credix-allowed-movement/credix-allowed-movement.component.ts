import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AllowedMovement } from '../../models/allowed-movement';
import { Observable } from 'rxjs';

@Component({
  selector: 'credix-allowed-movement',
  templateUrl: './credix-allowed-movement.component.html',
  styleUrls: ['./credix-allowed-movement.component.scss']
})
export class CredixAllowedMovementComponent implements OnInit, OnChanges {
  @Input() movement: AllowedMovement;
  @Input() selectedChanges: Observable<AllowedMovement[]>;
  @Input() lastItem: boolean;
  @Output() changeSelection = new EventEmitter<boolean>();
  disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkChanges(selected: AllowedMovement[]): void{
    if(selected.length > 0){
      this.disabled = selected[0].promoApply 
                          ? selected[0].promoDiscountMessage !== this.movement.promoDiscountMessage 
                          : this.movement.promoApply;
    }else{
      this.disabled = false;
    }
    
  }

  ngOnChanges(): void {
    this.selectedChanges.subscribe((val)=>{
      this.checkChanges(val)
    })
  }

  change(checked: boolean){
    this.changeSelection.emit(checked)
  }

}
