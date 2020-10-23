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
  @Input() totalMarchamo: number;
  @Input() iva: number;
  amountOfItemProduct: { amounts: number; productCode: number; }[] = [];
  totalOfItemProduct = 0;
  total = 0;
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
      this.amountOfItemProduct = this.marchamosService.amountProducts;
      this.computeCalculate();
      this.getTotalSum();
    }
  }

  getTotalSum() {
    let sum: number;
    sum = this.totalMarchamo + this.totalOfItemProduct + this.iva + this.commission;
    this.total = sum;
    this.marchamosService.total = this.total;
  }

  computeCalculate() {
    this.totalOfItemProduct = (this.amountOfItemProduct) ?
      this.amountOfItemProduct.reduce((a, b) => a + b.amounts, 0) : 0;
  }

  getTags(tags: Tag[]) {
    this.step4TagIva = tags.find(tag => tag.description === 'marchamo.stepper4.tagIVA')?.value;
    this.step4Subt1 = tags.find(tag => tag.description === 'marchamo.stepper4.subtitle1')?.value;
    this.step4TagCom = tags.find(tag => tag.description === 'marchamo.stepper4.tagComision')?.value;
    this.step4TagT = tags.find(tag => tag.description === 'marchamo.stepper4.tagTotal')?.value;
    this.step4TagSeg = tags.find(tag => tag.description === 'marchamo.stepper4.tagSeguros')?.value;
    this.step4Sub2 = tags.find(tag => tag.description === 'marchamo.stepper4.subtitle2')?.value;
    this.step4Subt3 = tags.find(tag => tag.description === 'marchamo.stepper4.subtitle3')?.value;
    this.step4TagMarch = tags.find(tag => tag.description === 'marchamo.stepper4.tagMarchamo')?.value;
  }
}
