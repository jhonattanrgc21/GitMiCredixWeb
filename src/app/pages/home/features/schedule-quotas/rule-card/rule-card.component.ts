import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { ProgrammedRule } from 'src/app/shared/models/programmed-rule';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-rule-card',
  templateUrl: './rule-card.component.html',
  styleUrls: ['./rule-card.component.scss']
})
export class RuleCardComponent implements OnInit {

  @Input() title: string;
  @Input() rule: ProgrammedRule;
  @Output() editSelectedRule = new EventEmitter<ProgrammedRule>();
  @Output() disableSelectedRule = new EventEmitter<ProgrammedRule>();

  tag1: string;
  tag2: string;
  minimumAmount: string;
  maximumAmount: string;
  currencySimbol: string;


  constructor(private tagsService: TagsService, private datePipe: DatePipe, private modalService: ModalService) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
    const amountRange: string[] = this.rule.amountRange.split('-');
    this.minimumAmount = amountRange[0];
    this.maximumAmount = amountRange[1];
    this.currencySimbol = this.rule.currencyId == 188 ? '₡' : '$';
  }

  formatNumber(value: string): string {
    value = value.replace(/,/g, '.');
    const number = parseFloat(value);
    const result = number === 0.0 ? number.toFixed(0) : number.toString();
    return result.replace('.', ',');
  }

  formatNumberWithCommas(num: string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formatDate(date: String): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  editRule(){
    this.editSelectedRule.emit(this.rule);
  }

  modifyState() {
    if (this.rule.isActive) {
      this.modalService.confirmationPopup('¿Desea desactivar esta regla?')
        .subscribe(confirmation => {
          if (confirmation) {
            this.rule.isActive = false;
            this.disableSelectedRule.emit(this.rule);
          }
        });
    }else {
      this.modalService.confirmationPopup('¿Desea activar esta regla?')
        .subscribe(confirmation => {
          if (confirmation) {
            this.rule.isActive = true;
            this.disableSelectedRule.emit(this.rule);
          }
        });
    }
  }

  getTags(tags: Tag[]) {
    this.tag1 = tags.find(tag => tag.description === 'programarcuotas.rulecard.comission')?.value;
    this.tag2 = tags.find(tag => tag.description === 'programarcuotas.rulecard.interest')?.value;
  }

}
