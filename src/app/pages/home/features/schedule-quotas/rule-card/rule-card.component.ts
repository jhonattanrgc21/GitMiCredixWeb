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
  @Output() ruleSelected = new EventEmitter<ProgrammedRule>();

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
    this.ruleSelected.emit(this.rule);
  }

  modifyState() {
    const value = !this.rule.isActive;

    // Si value es false se desactiva la regla
    if (!value) {
      this.modalService.confirmationPopup('¿Desea desactivar esta regla?', 'Se aplicará en máximo 24 horas hábiles.')
        .subscribe(confirmation => {
          if (confirmation) {
            console.log('Regla desactivada');
            this.rule.isActive = value;
          } else {
            console.log('Cancelado');
          }
        });
    }else this.rule.isActive = value;
  }

  getTags(tags: Tag[]) {
    this.tag1 = tags.find(tag => tag.description === 'programarcuotas.rulecard.comission')?.value;
    this.tag2 = tags.find(tag => tag.description === 'programarcuotas.rulecard.interest')?.value;
  }

}
