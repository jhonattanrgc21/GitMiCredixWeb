import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MarchamoService} from '../marchamo.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-marchamo-fourth-step',
  templateUrl: './marchamo-fourth-step.component.html',
  styleUrls: ['./marchamo-fourth-step.component.scss']
})
export class MarchamoFourthStepComponent implements OnInit, OnChanges {
  @Input() confirmForm: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required])
  });
  @Input() isActive = false;
  @Input() contactInfo: { name: string, phone: number, email: string };
  @Input() deliveryPlace: string;
  @Input() total: number;
  @Input() amountTotalProducts: number;
  @Input() totalAmount: number;
  @Input() iva: number;
  commission: number;
  step4TagIva: string;
  step4Subt1: string;
  step4TagCom: string;
  step4TagT: string;
  step4TagSeg: string;
  step4Sub2: string;
  step4Subt3: string;
  step4TagMarch: string;

  constructor(private tagsService: TagsService,
              private marchamosService: MarchamoService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Marchamo').tags)
    );


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.iva = this.marchamosService.iva;
      this.commission = this.marchamosService.commission;
      this.marchamosService.amountProducts.forEach(value => {
        this.computeCalculate(value.amounts);
      });
      this.getTotalSum();
    }
  }

  getTotalSum() {
    this.total = this.total + this.totalAmount + this.amountTotalProducts + this.iva + this.commission;
    this.marchamosService.total = this.total;
  }

  computeCalculate(value: number) {
    this.amountTotalProducts += value;
  }

  getTags(tags: Tag[]) {
    this.step4TagIva = tags.find(tag => tag.description === 'marchamo.stepper4.tagIVA').value;
    this.step4Subt1 = tags.find(tag => tag.description === 'marchamo.stepper4.subtitle1').value;
    this.step4TagCom = tags.find(tag => tag.description === 'marchamo.stepper4.tagComision').value;
    this.step4TagT = tags.find(tag => tag.description === 'marchamo.stepper4.tagTotal').value;
    this.step4TagSeg = tags.find(tag => tag.description === 'marchamo.stepper4.tagSeguros').value;
    this.step4Sub2 = tags.find(tag => tag.description === 'marchamo.stepper4.subtitle2').value;
    this.step4Subt3 = tags.find(tag => tag.description === 'marchamo.stepper4.subtitle3').value;
    this.step4TagMarch = tags.find(tag => tag.description === 'marchamo.stepper4.tagMarchamo').value;
  }
}
