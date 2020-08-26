import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Item} from 'src/app/shared/models/item.model';

@Component({
  selector: 'second-step-optional-insurances',
  templateUrl: './second-step-optional-insurances.component.html',
  styleUrls: ['./second-step-optional-insurances.component.scss']
})
export class SecondStepOptionalInsurancesComponent implements OnInit {
  itemProduct: Item[] = [
    {
      responseDescription: 'Responsabilidad civil',
      responseCode: 15,
      productCode: 5
    },
    {
      responseDescription: 'Asistencia en carretera',
      responseCode: 15,
      productCode: 6
    },
    {
      responseDescription: 'Mas protección',
      responseCode: 15,
      productCode: 8
    }
  ];
  isChecked: boolean = false;

  @Input() amountItemsProducts: { responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number };

  @Input() aditionalProducts: FormArray;

  constructor() {
  }

  ngOnInit(): void {
  }


  getValueCheckBoxes(event: any) {
    const checkArray: FormArray = this.aditionalProducts as FormArray;

    if (event.checked) {
      checkArray.push(new FormGroup({
        productCode: new FormControl(event.value)
      }));
    } else {
      let index: number = 0;
      checkArray.controls.forEach((item: FormGroup) => {
        if (item.value.productCode === event.value) {
          checkArray.removeAt(index);
          return;
        }
        index++;
      });
    }
  }

  getValueOfCheckBoxAll(event) {
    const checkArray: FormArray = this.aditionalProducts as FormArray;

    if (event.value === 10 && event.checked) {
      this.allChecked(event.checked);
      for (const product of this.itemProduct) {
        checkArray.push(
          new FormGroup({
            productCode: new FormControl(product.productCode)
          }));
        checkArray.removeAt(3);
      }
    } else {
      this.allChecked(event.checked);
      checkArray.controls.splice(0, this.itemProduct.length);
      checkArray.setValue([]);
    }
  }

  allChecked(event?: any) {
    this.isChecked = event;
  }


}
