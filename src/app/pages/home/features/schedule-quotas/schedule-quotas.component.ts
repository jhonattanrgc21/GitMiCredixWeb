import { CdkStepper } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ScheduleQuotasService } from './schedule-quotas.service';
import { CredixCodeErrorService } from 'src/app/core/services/credix-code-error.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tag } from 'src/app/shared/models/tag';
import { InformationPopupComponent } from './information-popup/information-popup.component';

@Component({
  selector: 'app-schedule-quotas',
  templateUrl: './schedule-quotas.component.html',
  styleUrls: ['./schedule-quotas.component.scss'],
  providers: [DatePipe]
})
export class ScheduleQuotasComponent implements OnInit, AfterViewInit {
  currencyForm: FormGroup;
  colonesForm: FormGroup =  new FormGroup({
    minimumAmount: new FormControl(null, Validators.required),
    maximumAmount: new FormControl(null, Validators.required),
    quotas: new FormControl(null, Validators.required),
    commissions: new FormControl(null, Validators.required),
    interest: new FormControl(null, Validators.required),
    initDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
  })
  dollarsForm: FormGroup =  new FormGroup({
    minimumAmount: new FormControl(null, Validators.required),
    maximumAmount: new FormControl(null, Validators.required),
    quotas: new FormControl(null, Validators.required),
    commissions: new FormControl(null, Validators.required),
    interest: new FormControl(null, Validators.required),
    initDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required),
  })

  isColones: boolean = false;
  isDollars: boolean = false;
  selectedIndex = 0;
  disableButton = true;
  done = false;
  message: string;
  status: 'success' | 'error';
  title: string;
  info1: string;
  info2: string;
  info3: string;
  option1: string;
  option2: string;
  step: string;
  step2: string;
  step3: string;
  todayString: string;
  rulesList: any[] = [];
  isActiveStepper: boolean = false;
  @ViewChild('scheduleQuotasStepper') stepper: CdkStepper;

  constructor(private scheduleQuotasService: ScheduleQuotasService,
    private credixCodeErrorService: CredixCodeErrorService,
    private modalService: ModalService,
    private tagsService: TagsService,
    private router: Router,
    private datePipe: DatePipe) {
    this.todayString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.currencyForm = new FormGroup({
      disableNextStep: new FormControl(false, Validators.required),
    });

    this.colonesForm =  new FormGroup({
      minimumAmount: new FormControl(null, Validators.required),
      maximumAmount: new FormControl(null, Validators.required),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })
    this.dollarsForm =  new FormGroup({
      minimumAmount: new FormControl(null, Validators.required),
      maximumAmount: new FormControl(null, Validators.required),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })
  }


  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  ngAfterViewInit(): void {
    this.setEnableButton();
  }

  setIsColones(value: boolean){
    this.isColones = value;
  }
  setIsDollars(value: boolean){
    this.isDollars = value;
  }

  existRules():boolean{
    return this.rulesList.length > 0;
  }

  activeStepper(value: boolean){
    this.isActiveStepper = value;
  }

  canNotAdvance(): boolean {
    return this.colonesForm.invalid || this.dollarsForm.invalid;
  }

  setEnableButton() {
    switch (this.selectedIndex) {
      case 0:
        this.currencyForm.valueChanges.subscribe((obj) => {
          this.disableButton = this.currencyForm.get('disableNextStep').value;
        });
        this.colonesForm.reset();
        this.dollarsForm.reset();
        if(this.isColones || this.isDollars) this.disableButton = false;
        break;
        case 1:
          //this.disableButton = this.canNotAdvance();
          this.disableButton = false;
        break;
      case 2:
        this.disableButton = false;
        break;
    }
  }

  next() {
    if (this.selectedIndex < 3) {
      this.stepper.next();
      this.selectedIndex++;
      this.disableButton = false;
    }

    if (this.selectedIndex === 3) {
      this.openConfirmationModal(1);
    }

    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

  openConfirmationModal(typeModal: number) {

    switch(typeModal){
      case 1:
        this.modalService.confirmationPopup('¿Desea establecer esta regla?')
        .subscribe(confirmation => {
          if (confirmation) {
            console.log('Confirmado');
          } else {
            this.selectedIndex = 2;
          }
        });
      break;

      case 2:
        this.modalService.confirmationPopup('¿Desea desactivar esta regla?', 'Se aplicará en máximo 24 horas hábiles.')
        .subscribe(confirmation => {
          if (confirmation) {
            console.log('Regla desactivada');
          } else {
            console.log('Cancelado');
          }
        });
      break;

      case 3:
        this.modalService.confirmationPopup('¿Desea activar esta regla?', 'Se aplicará en máximo 24 horas hábiles.')
        .subscribe(confirmation => {
          if (confirmation) {
            console.log('Regla activada');
          } else {
            console.log('Cancelado');
          }
        });
      break;

      case 4:
        this.modalService.confirmationPopup('¿Desea editar esta regla?')
        .subscribe(confirmation => {
          if (confirmation) {
            console.log('Regla editada');
          } else {
            console.log('Cancelado');
          }
        });
      break;
    }
  }

  openInformationModal(){
    this.modalService.open({
      component: InformationPopupComponent,
      hideCloseButton: true,
      title: 'Programar cuotas',
    }, {width: 343, height: 519, disableClose: false, panelClass: 'schedule-quotas-information-panel'})
      .afterClosed().subscribe();
  }

  getTags(tags: Tag[]) {
    this.info1 = tags.find(tag => tag.description === 'programarcuotas.info1')?.value;
    this.option1 = tags.find(tag => tag.description === 'programarcuotas.option1')?.value;
    this.option2 = tags.find(tag => tag.description === 'programarcuotas.option2')?.value;
    this.info2 = tags.find(tag => tag.description === 'programarcuotas.info2')?.value;
    this.info3 = tags.find(tag => tag.description === 'programarcuotas.info3')?.value;
    this.step = tags.find(tag => tag.description === 'programarcuotas.stepper1')?.value;
    this.step2 = tags.find(tag => tag.description === 'programarcuotas.stepper2')?.value;
    this.step3 = tags.find(tag => tag.description === 'programarcuotas.stepper3')?.value;
  }

}
