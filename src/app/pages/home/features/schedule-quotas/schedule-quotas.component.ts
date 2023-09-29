import { CdkStepper } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ScheduleQuotasService } from './schedule-quotas.service';
import { CredixCodeErrorService } from 'src/app/core/services/credix-code-error.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      this.selectedIndex = this.stepper.selectedIndex;
      this.disableButton = false;
    }

    if (this.selectedIndex === 3) {
      //this.openConfirmationModal();
    }

    this.setEnableButton();
  }

  back() {
    this.selectedIndex--;
    this.stepper.previous();
    this.setEnableButton();
  }

}
